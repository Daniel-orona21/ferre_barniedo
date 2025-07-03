import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-recibos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BsDatepickerModule],
  templateUrl: './recibos.component.html',
  styleUrl: './recibos.component.scss'
})
export class RecibosComponent {

  isModalVisible = false;
  selectedOrdenCompra: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  // Filtros
  filtroUsuario: string = '';
  filtroSucursal: string = '';
  filtroEstatus: string = '';
  filtroBusqueda: string = '';

  todasLasOrdenes = [
    { id: 11, fecha: '14/02/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-03-AED', estatus: 'Descargado' },
    { id: 10, fecha: '11/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-02-AED', estatus: 'Visto' },
    { id: 9, fecha: '10/01/2025', Usuario: 'Luis López', nombreRecibo: 'RA100VS2025-01-AEF', estatus: 'Pendiente' },
    { id: 8, fecha: '09/01/2025', Usuario: 'María García', nombreRecibo: 'RA100VS2025-01-ABC', estatus: 'Descargado' },
    { id: 7, fecha: '08/01/2025', Usuario: 'Carlos Ruiz', nombreRecibo: 'RA100VS2025-01-DEF', estatus: 'Visto' },
    { id: 6, fecha: '07/01/2025', Usuario: 'Ana Martínez', nombreRecibo: 'RA100VS2025-01-GHI', estatus: 'Pendiente' },
    { id: 5, fecha: '06/01/2025', Usuario: 'Luis Gomez', nombreRecibo: 'RA100VS2025-01-JKL', estatus: 'Descargado' },
    { id: 4, fecha: '05/01/2025', Usuario: 'Juan Pérez', nombreRecibo: 'RA100VS2025-01-MNO', estatus: 'Visto' },
  ];

  ordenesCompra = [...this.todasLasOrdenes];
  fechaDesde: Date | undefined;
  fechaHasta: Date | undefined;

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private localeService: BsLocaleService) {
    defineLocale('es', esLocale);
    this.localeService.use('es');
    this.bsConfig = Object.assign({}, { 
      containerClass: 'theme-default',
      dateInputFormat: 'DD/MM/YYYY'
    });
  }

  // Método para aplicar todos los filtros
  aplicarFiltros() {
    let ordenesFiltradas = [...this.todasLasOrdenes];

    // Filtro por usuario
    if (this.filtroUsuario) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.Usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase())
      );
    }

    // Filtro por sucursal (por ahora no hay campo sucursal, pero se puede agregar)
    if (this.filtroSucursal) {
      // ordenesFiltradas = ordenesFiltradas.filter(orden => 
      //   orden.sucursal && orden.sucursal.toLowerCase().includes(this.filtroSucursal.toLowerCase())
      // );
    }

    // Filtro por estatus
    if (this.filtroEstatus) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.estatus === this.filtroEstatus
      );
    }

    // Filtro por búsqueda general
    if (this.filtroBusqueda) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => 
        orden.id.toString().includes(this.filtroBusqueda) ||
        orden.fecha.includes(this.filtroBusqueda) ||
        orden.Usuario.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        orden.nombreRecibo.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        orden.estatus.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      );
    }

    // Filtro por fecha
    if (this.fechaDesde && this.fechaHasta) {
      ordenesFiltradas = ordenesFiltradas.filter(orden => {
        const fechaOrden = this.parseDate(orden.fecha);
        return fechaOrden >= this.fechaDesde! && fechaOrden <= this.fechaHasta!;
      });
    }

    this.ordenesCompra = ordenesFiltradas;
  }

  // Métodos para cada filtro individual
  filtrarPorUsuario() {
    this.aplicarFiltros();
  }

  filtrarPorSucursal() {
    this.aplicarFiltros();
  }

  filtrarPorEstatus() {
    this.aplicarFiltros();
  }

  filtrarPorBusqueda() {
    this.aplicarFiltros();
  }

  filtrarPorFecha() {
    this.aplicarFiltros();
  }

  // Método para limpiar todos los filtros
  limpiarFiltros() {
    this.filtroUsuario = '';
    this.filtroSucursal = '';
    this.filtroEstatus = '';
    this.filtroBusqueda = '';
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.ordenesCompra = [...this.todasLasOrdenes];
  }

  // Getter para verificar si hay filtros activos
  get hayFiltrosActivos(): boolean {
    return !!(
      this.filtroUsuario ||
      this.filtroSucursal ||
      this.filtroEstatus ||
      this.filtroBusqueda ||
      this.fechaDesde ||
      this.fechaHasta
    );
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  openNewOrdenCompraModal() {
    this.selectedOrdenCompra = { fecha: '', nombreRecibo: '', estatus: 'Pendiente' };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  openModal(ordenCompra: any, action: string) {
    this.selectedOrdenCompra = { ...ordenCompra };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedOrdenCompra = null;
    this.modalAction = '';
  }

  saveOrdenCompra() {
    if (this.modalAction === 'edit') {
      const index = this.ordenesCompra.findIndex(o => o.id === this.selectedOrdenCompra.id);
      if (index !== -1) {
        this.ordenesCompra[index] = { ...this.selectedOrdenCompra };
      }
    } else if (this.modalAction === 'new') {
      const newId = this.ordenesCompra.length > 0 ? Math.max(...this.ordenesCompra.map(o => o.id)) + 1 : 1;
      this.ordenesCompra.unshift({ id: newId, ...this.selectedOrdenCompra });
    }
    this.closeModal();
  }

  deleteOrdenCompra() {
    this.ordenesCompra = this.ordenesCompra.filter(o => o.id !== this.selectedOrdenCompra.id);
    this.closeModal();
  }
}

