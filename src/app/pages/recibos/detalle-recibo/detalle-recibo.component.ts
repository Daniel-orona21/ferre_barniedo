import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecibosService } from '../../../services/recibos.service';

@Component({
  selector: 'app-detalle-recibo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-recibo.component.html',
  styleUrl: './detalle-recibo.component.scss'
})
export class DetalleReciboComponent implements OnInit {
  recibo: any = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private recibosService: RecibosService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convertir a número
      this.recibo = this.recibosService.getReciboById(id);
    });
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