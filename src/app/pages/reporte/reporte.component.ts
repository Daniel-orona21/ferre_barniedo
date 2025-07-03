import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

interface Recibo {
  id: number;
  fecha: string;
  usuario: string;
  nombreRecibo: string;
  estatus: string;
  sucursal: string;
  nomina: string;
}

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BsDatepickerModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {

  // Datos de ejemplo basados en la imagen
  todosLosRecibos: Recibo[] = [
    { id: 11, fecha: '12/02/2025', usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-03-AED', estatus: 'Visto', sucursal: 'Guadalajara', nomina: 'N001' },
    { id: 10, fecha: '12/02/2025', usuario: 'Juan Perez', nombreRecibo: 'RE101AE2025-03-ADD', estatus: 'Descargado', sucursal: 'Colima', nomina: 'N002' },
    { id: 9, fecha: '12/02/2025', usuario: 'Luis Lopez', nombreRecibo: 'RO202FC2025-03-SED', estatus: 'Pendiente', sucursal: 'Zapopan', nomina: 'N003' },
    { id: 8, fecha: '11/02/2025', usuario: 'Maria Rodriguez', nombreRecibo: 'RA200VS2025-03-BED', estatus: 'Visto', sucursal: 'Guadalajara', nomina: 'N004' },
    { id: 7, fecha: '11/02/2025', usuario: 'Carlos Mendoza', nombreRecibo: 'RE201AE2025-03-CDD', estatus: 'Descargado', sucursal: 'Manzanillo', nomina: 'N005' },
    { id: 6, fecha: '11/02/2025', usuario: 'Ana Sanchez', nombreRecibo: 'RO302FC2025-03-TED', estatus: 'Pendiente', sucursal: 'Colima', nomina: 'N006' },
    { id: 5, fecha: '10/02/2025', usuario: 'Pedro Jimenez', nombreRecibo: 'RA300VS2025-03-FED', estatus: 'Visto', sucursal: 'Zapopan', nomina: 'N007' },
    { id: 4, fecha: '10/02/2025', usuario: 'Sofia Martinez', nombreRecibo: 'RE301AE2025-03-GDD', estatus: 'Descargado', sucursal: 'Guadalajara', nomina: 'N008' },
    { id: 3, fecha: '10/02/2025', usuario: 'Diego Ramirez', nombreRecibo: 'RO402FC2025-03-HED', estatus: 'Pendiente', sucursal: 'Manzanillo', nomina: 'N009' },
    { id: 2, fecha: '09/02/2025', usuario: 'Lucia Herrera', nombreRecibo: 'RA400VS2025-03-JED', estatus: 'Visto', sucursal: 'Colima', nomina: 'N010' },
    { id: 1, fecha: '09/02/2025', usuario: 'Miguel Torres', nombreRecibo: 'RE401AE2025-03-KDD', estatus: 'Descargado', sucursal: 'Zapopan', nomina: 'N011' }
  ];

  recibosFiltrados: Recibo[] = [...this.todosLosRecibos];
  
  // Propiedades para filtros
  fechaInicio: Date | undefined;
  fechaFin: Date | undefined;
  filtroUsuario: string = '';
  filtroEstatus: string = '';
  filtroSucursal: string = '';
  filtroNomina: string = '';
  filtroBusqueda: string = '';

  // Listas para dropdowns
  listaUsuarios: string[] = [];
  listaEstatus: string[] = ['Visto', 'Descargado', 'Pendiente'];
  listaSucursales: string[] = [];
  listaNominas: string[] = [];

  // Propiedades para paginación
  paginaActual: number = 0;
  resultadosPorPagina: number = 10;
  totalRecibos: number = 0;

  // Configuración del datepicker
  bsConfig: Partial<BsDatepickerConfig>;

  // Propiedad para usar Math en el template
  Math = Math;

  // Getter para verificar si hay filtros activos
  get hayFiltrosActivos(): boolean {
    return !!(this.fechaInicio || this.fechaFin || this.filtroUsuario || 
              this.filtroEstatus || this.filtroSucursal || this.filtroNomina || this.filtroBusqueda);
  }

  constructor(private localeService: BsLocaleService) {
    defineLocale('es', esLocale);
    this.localeService.use('es');
    this.bsConfig = Object.assign({}, { 
      containerClass: 'theme-dark-custom',
      dateInputFormat: 'DD/MM/YYYY'
    });

    this.inicializarListas();
    this.aplicarFiltros();
  }

  inicializarListas() {
    // Generar listas únicas para los dropdowns
    this.listaUsuarios = [...new Set(this.todosLosRecibos.map(r => r.usuario))].sort();
    this.listaSucursales = [...new Set(this.todosLosRecibos.map(r => r.sucursal))].sort();
    this.listaNominas = [...new Set(this.todosLosRecibos.map(r => r.nomina))].sort();
  }

  aplicarFiltros() {
    let recibosTemp = [...this.todosLosRecibos];

    // Filtrar por fecha
    if (this.fechaInicio && this.fechaFin) {
      recibosTemp = recibosTemp.filter(recibo => {
        const fechaRecibo = this.parseDate(recibo.fecha);
        return fechaRecibo >= this.fechaInicio! && fechaRecibo <= this.fechaFin!;
      });
    }

    // Filtrar por usuario
    if (this.filtroUsuario) {
      recibosTemp = recibosTemp.filter(recibo => 
        recibo.usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase())
      );
    }

    // Filtrar por estatus
    if (this.filtroEstatus) {
      recibosTemp = recibosTemp.filter(recibo => recibo.estatus === this.filtroEstatus);
    }

    // Filtrar por sucursal
    if (this.filtroSucursal) {
      recibosTemp = recibosTemp.filter(recibo => recibo.sucursal === this.filtroSucursal);
    }

    // Filtrar por nómina
    if (this.filtroNomina) {
      recibosTemp = recibosTemp.filter(recibo => recibo.nomina === this.filtroNomina);
    }

    // Filtrar por búsqueda general
    if (this.filtroBusqueda) {
      const termino = this.filtroBusqueda.toLowerCase();
      recibosTemp = recibosTemp.filter(recibo => 
        recibo.usuario.toLowerCase().includes(termino) ||
        recibo.nombreRecibo.toLowerCase().includes(termino) ||
        recibo.estatus.toLowerCase().includes(termino) ||
        recibo.sucursal.toLowerCase().includes(termino) ||
        recibo.nomina.toLowerCase().includes(termino)
      );
    }

    this.totalRecibos = recibosTemp.length;
    this.paginaActual = 0; // Resetear paginación al filtrar
    this.actualizarPaginacion(recibosTemp);
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private actualizarPaginacion(recibos: Recibo[]) {
    const inicio = this.paginaActual * this.resultadosPorPagina;
    const fin = inicio + this.resultadosPorPagina;
    this.recibosFiltrados = recibos.slice(inicio, fin);
  }

  cambiarPaginacion() {
    this.paginaActual = 0;
    this.aplicarFiltros();
  }

  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.aplicarFiltros();
    }
  }

  paginaSiguiente() {
    if ((this.paginaActual + 1) * this.resultadosPorPagina < this.totalRecibos) {
      this.paginaActual++;
      this.aplicarFiltros();
    }
  }

  limpiarFiltros() {
    this.fechaInicio = undefined;
    this.fechaFin = undefined;
    this.filtroUsuario = '';
    this.filtroEstatus = '';
    this.filtroSucursal = '';
    this.filtroNomina = '';
    this.filtroBusqueda = '';
    this.aplicarFiltros();
  }
}

