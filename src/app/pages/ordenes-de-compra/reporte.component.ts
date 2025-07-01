import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BsDatepickerModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {

  isModalVisible = false;
  selectedOrdenCompra: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  todasLasOrdenes = [
    { id: 1, fecha: '25/06/2025', oc: 45789, proveedor: 'Proveedor1', procedencia: '30/06/2025', cantidadRecibir: 100, precioTotal: '$15,000.00', ubicacion: 'Guadalajara', solicitante: 'Usuario1', estatus: 'Pendiente' },
    { id: 2, fecha: '25/06/2025', oc: 401611, proveedor: 'Proveedor1', procedencia: '30/06/2025', cantidadRecibir: 30, precioTotal: '$10,000.00', ubicacion: 'Colima', solicitante: 'Usuario3', estatus: 'Ordenada' },
    { id: 3, fecha: '25/06/2025', oc: 356621, proveedor: 'Proveedor4', procedencia: '30/06/2025', cantidadRecibir: 20, precioTotal: '$9,150.00', ubicacion: 'CD Guzman', solicitante: 'Usuario4', estatus: 'Ordenada' },
    { id: 4, fecha: '24/06/2025', oc: 247905, proveedor: 'Proveedor2', procedencia: '26/06/2025', cantidadRecibir: 40, precioTotal: '$8,550.00', ubicacion: 'Manzanillo', solicitante: 'Usuario3', estatus: 'Ordenada' },
    { id: 5, fecha: '24/06/2025', oc: 23468, proveedor: 'Proveedor1', procedencia: '26/06/2025', cantidadRecibir: 70, precioTotal: '$16,850.00', ubicacion: 'Colima', solicitante: 'Usuario3', estatus: 'Ordenada' },
    { id: 6, fecha: '24/06/2025', oc: 23447, proveedor: 'Proveedor1', procedencia: '26/06/2025', cantidadRecibir: 50, precioTotal: '$15,000.00', ubicacion: 'Zapopan', solicitante: 'Usuario2', estatus: 'Ordenada' },
    { id: 7, fecha: '23/06/2025', oc: 228780, proveedor: 'Proveedor7', procedencia: '23/06/2025', cantidadRecibir: 20, precioTotal: '$9,750.00', ubicacion: 'Guadalajara', solicitante: 'Usuario1', estatus: 'Cancelada' },
    { id: 8, fecha: '16/06/2025', oc: 22689, proveedor: 'Proveedor5', procedencia: '20/06/2025', cantidadRecibir: 80, precioTotal: '$11,950.00', ubicacion: 'Zapopan', solicitante: 'Usuario2', estatus: 'Surtida' },
    { id: 9, fecha: '16/06/2025', oc: 21268, proveedor: 'Proveedor1', procedencia: '20/06/2025', cantidadRecibir: 90, precioTotal: '$21,500.00', ubicacion: 'Guadalajara', solicitante: 'Usuario1', estatus: 'Surtida' },
    { id: 10, fecha: '13/06/2025', oc: 13497, proveedor: 'Proveedor3', procedencia: '15/06/2025', cantidadRecibir: 100, precioTotal: '$25,550.00', ubicacion: 'Guadalajara', solicitante: 'Usuario1', estatus: 'Surtida' }
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

  filtrarPorFecha() {
    if (this.fechaDesde && this.fechaHasta) {
      this.ordenesCompra = this.todasLasOrdenes.filter(orden => {
        const fechaOrden = this.parseDate(orden.fecha);
        return fechaOrden >= this.fechaDesde! && fechaOrden <= this.fechaHasta!;
      });
    } else {
      this.ordenesCompra = [...this.todasLasOrdenes];
    }
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  openNewOrdenCompraModal() {
    this.selectedOrdenCompra = { fecha: '', oc: null, proveedor: '', procedencia: '', cantidadRecibir: null, precioTotal: '', ubicacion: '', solicitante: '', estatus: 'Pendiente' };
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

