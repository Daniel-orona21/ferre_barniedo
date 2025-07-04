import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecibosService } from '../../../services/recibos.service';
import { AuthService } from '../../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalle-recibo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-recibo.component.html',
  styleUrl: './detalle-recibo.component.scss'
})
export class DetalleReciboComponent implements OnInit {
  recibo: any = null;
  generandoPDF = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private recibosService: RecibosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convertir a número
      this.recibo = this.recibosService.getReciboById(id, this.authService.currentUserValue?.role);
    });
  }

  // Función para descargar el recibo como PDF
  async descargarPDF() {
    if (!this.recibo || this.generandoPDF) return;

    this.generandoPDF = true;

    try {
      // Obtener el elemento del recibo
      const elemento = document.querySelector('.recibo-nomina') as HTMLElement;
      if (!elemento) {
        this.generandoPDF = false;
        return;
      }

      // Convertir todas las imágenes a base64 antes de capturar
      await this.convertirImagenesABase64(elemento);

      // Esperar a que todas las imágenes se carguen
      await this.esperarImagenes(elemento);

      // Pausa adicional para estabilizar el DOM
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Configurar opciones para html2canvas con mejor manejo de imágenes
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: elemento.scrollWidth,
        height: elemento.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        logging: false
      });

      // Crear PDF tamaño carta
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [216, 279]
      });

      // Calcular dimensiones para PDF
      const pageWidth = 216;
      const pageHeight = 279;
      const margin = 10;
      
      // Calcular escala para ajustar contenido manteniendo proporciones
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const contentWidth = pageWidth - (margin * 2);
      const contentHeight = pageHeight - (margin * 2);
      
      const scaleX = contentWidth / (imgWidth * 0.264583);
      const scaleY = contentHeight / (imgHeight * 0.264583);
      const scale = Math.min(scaleX, scaleY);

      const finalWidth = (imgWidth * 0.264583) * scale;
      const finalHeight = (imgHeight * 0.264583) * scale;

      // Centrar contenido en la página
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      // Agregar imagen al PDF
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG', 
        x, 
        y, 
        finalWidth, 
        finalHeight
      );

      // Generar nombre del archivo
      const fecha = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
      const nombreArchivo = `Recibo_Nomina_${this.recibo.nombreRecibo}_${fecha}.pdf`;
      
      // Descargar el PDF
      pdf.save(nombreArchivo);

      // Mostrar mensaje de éxito
      this.mostrarMensajeExito(`PDF generado exitosamente: ${nombreArchivo}`);

    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      this.generandoPDF = false;
    }
  }

  // Función para convertir imágenes a base64
  private async convertirImagenesABase64(elemento: HTMLElement): Promise<void> {
    const images = elemento.querySelectorAll('img');
    
    for (const img of Array.from(images)) {
      try {
        const base64 = await this.imagenABase64(img.src);
        img.src = base64;
      } catch (error) {
        console.warn('No se pudo convertir imagen a base64:', img.src);
      }
    }
  }

  // Función para convertir una imagen a base64
  private imagenABase64(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL('image/png');
            resolve(base64);
          } else {
            reject(new Error('No se pudo obtener contexto del canvas'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error(`No se pudo cargar la imagen: ${src}`));
      };
      
      // Construir URL absoluta para las imágenes locales
      let imgSrc = src;
      if (src.startsWith('images/')) {
        imgSrc = `/${src}`;
      }
      
      img.src = imgSrc;
    });
  }

  // Función para esperar a que todas las imágenes se carguen
  private esperarImagenes(elemento: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      const images = elemento.querySelectorAll('img');
      let imagenesRestantes = images.length;

      if (imagenesRestantes === 0) {
        resolve();
        return;
      }

      images.forEach(img => {
        if (img.complete) {
          imagenesRestantes--;
          if (imagenesRestantes === 0) {
            resolve();
          }
        } else {
          img.onload = () => {
            imagenesRestantes--;
            if (imagenesRestantes === 0) {
              resolve();
            }
          };
        }
      });
    });
  }

  // Función para mostrar mensaje de éxito
  private mostrarMensajeExito(mensaje: string) {
    // Crear elemento de mensaje
    const messageElement = document.createElement('div');
    messageElement.textContent = mensaje;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.right = '20px';
    messageElement.style.backgroundColor = '#4CAF50';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px 20px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '1000';
    messageElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    messageElement.style.fontSize = '14px';
    messageElement.style.fontWeight = 'bold';

    // Agregar al DOM
    document.body.appendChild(messageElement);

    // Remover después de 3 segundos
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 3000);
  }

  // Datos completos del recibo para mostrar
  get datosCompletos() {
    if (!this.recibo) return null;

    return {
      // Información de la empresa
      empresa: {
        nombre: 'FERRE BARNIEDO',
        rfc: 'ABC000000AB0',
        regPat: 'A0000000000',
        fecha: '31/ene/2025',
        regimenFiscal: 'General de la ley personas morales',
        lugarExpedicion: '00000 Zapopan'
      },
      
      // Información del empleado
      empleado: {
        nombre: '000 - Nombre Apellido ABC',
        rfc: 'ABCD000000AR',
        curp: 'ABCD000000MNTAA00',
        fechaIniRelacion: 'XX/XX/XXXX',
        jornada: '01 xxxxxx',
        nss: '00000000000',
        tipoSalario: 'Fijo'
      },
      
      // Información del período
      periodo: {
        ejercicio: '2025',
        periodo: '1.01 Quincenal',
        fechaInicio: '01/ene/2025',
        fechaFin: '31/ene',
        diasPago: '15',
        fechaPago: '31/ene/20',
        puesto: 'Puesto',
        depto: 'Operacion',
        sbc: '$'
      },
      
      // Percepciones
      percepciones: [
        {
          agrupSat: 'P 001',
          numero: '001',
          concepto: 'Sueldo',
          total: '$0.00'
        }
      ],
      
      // Deducciones
      deducciones: [
        {
          agrupSat: 'P 001',
          numero: '045',
          concepto: 'I.S.R.',
          total: '$0.00'
        }
      ],
      
      // Totales
      totales: {
        subtotal: '$0.00',
        descuentos: '$0.00',
        retenciones: '$0.00',
        total: '$0.00'
      },
      
      // Información original del recibo
      original: this.recibo
    };
  }

  onVolver() {
    this.router.navigate(['/app/recibos']);
  }
} 