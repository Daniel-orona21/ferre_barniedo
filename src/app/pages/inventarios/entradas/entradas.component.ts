import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntradasComponent {
  isModalVisible = false;
  selectedInventario: any = null;
  modalAction = ''; // 'view' or 'edit'

  inventarios = [
    {
      fecha: '25/06/2025',
      oc: '45789',
      proveedor: 'Proveedor1',
      fechaLlegada: '30/06/2025',
      cantidadRecibir: 100,
      cantidadRecibida: 0,
      precioTotal: '$15,000.00',
      ubicacion: 'Guadalajara',
      solicitante: 'Usuario1',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '25/06/2025',
      oc: '401611',
      proveedor: 'Proveedor1',
      fechaLlegada: '30/06/2025',
      cantidadRecibir: 30,
      cantidadRecibida: 0,
      precioTotal: '$10,000.00',
      ubicacion: 'Colima',
      solicitante: 'Usuario3',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '25/06/2025',
      oc: '356621',
      proveedor: 'Proveedor4',
      fechaLlegada: '30/06/2025',
      cantidadRecibir: 20,
      cantidadRecibida: 0,
      precioTotal: '$9,150.00',
      ubicacion: 'CD Guzman',
      solicitante: 'Usuario4',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '24/06/2025',
      oc: '247091',
      proveedor: 'Proveedor2',
      fechaLlegada: '40/06/2025',
      cantidadRecibir: 40,
      cantidadRecibida: 0,
      precioTotal: '$8,550.00',
      ubicacion: 'Manzanillo',
      solicitante: 'Usuario3',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '24/06/2025',
      oc: '23468',
      proveedor: 'Proveedor1',
      fechaLlegada: '26/06/2025',
      cantidadRecibir: 70,
      cantidadRecibida: 0,
      precioTotal: '$16,850.00',
      ubicacion: 'Colima',
      solicitante: 'Usuario3',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '24/06/2025',
      oc: '23447',
      proveedor: 'Proveedor1',
      fechaLlegada: '26/06/2025',
      cantidadRecibir: 50,
      cantidadRecibida: 0,
      precioTotal: '$15,000.00',
      ubicacion: 'Zapopan',
      solicitante: 'Usuario2',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    },
    {
      fecha: '23/06/2025',
      oc: '228780',
      proveedor: 'Proveedor7',
      fechaLlegada: '25/06/2025',
      cantidadRecibir: 20,
      cantidadRecibida: 0,
      precioTotal: '$9,750.00',
      ubicacion: 'Guadalajara',
      solicitante: 'Usuario1',
      estadoMercancia: 'Devuelto',
      estatus: 'Validado'
    },
    {
      fecha: '16/06/2025',
      oc: '22689',
      proveedor: 'Proveedor5',
      fechaLlegada: '20/06/2025',
      cantidadRecibir: 80,
      cantidadRecibida: 65,
      precioTotal: '$11,950.00',
      ubicacion: 'Zapopan',
      solicitante: 'Usuario2',
      estadoMercancia: 'Faltante',
      estatus: 'Validado'
    },
    {
      fecha: '16/06/2025',
      oc: '21268',
      proveedor: 'Proveedor1',
      fechaLlegada: '20/06/2025',
      cantidadRecibir: 90,
      cantidadRecibida: 90,
      precioTotal: '$21,500.00',
      ubicacion: 'Guadalajara',
      solicitante: 'Usuario1',
      estadoMercancia: 'Recibido',
      estatus: 'Validado'
    },
    {
      fecha: '13/06/2025',
      oc: '13497',
      proveedor: 'Proveedor3',
      fechaLlegada: '15/06/2025',
      cantidadRecibir: 100,
      cantidadRecibida: 100,
      precioTotal: '$25,550.00',
      ubicacion: 'Guadalajara',
      solicitante: 'Usuario1',
      estadoMercancia: 'Recibido',
      estatus: 'Validado'
    }
  ];

  openModal(item: any, action: string) {
    this.selectedInventario = { ...item };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  openNewInventarioModal() {
    this.selectedInventario = {
      fecha: '',
      oc: '',
      proveedor: '',
      fechaLlegada: '',
      cantidadRecibir: 0,
      cantidadRecibida: 0,
      precioTotal: '',
      ubicacion: '',
      solicitante: '',
      estadoMercancia: 'Pendiente',
      estatus: 'Pendiente'
    };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedInventario = null;
    this.modalAction = '';
  }

  saveInventario() {
    if (this.modalAction === 'new') {
      this.inventarios.push({ ...this.selectedInventario });
    } else {
      // Edit existing item
      const index = this.inventarios.findIndex(i =>
        i.oc === this.selectedInventario.oc &&
        i.fecha === this.selectedInventario.fecha
      );
      if (index !== -1) {
        this.inventarios[index] = { ...this.selectedInventario };
      }
    }
    this.closeModal();
  }
}
