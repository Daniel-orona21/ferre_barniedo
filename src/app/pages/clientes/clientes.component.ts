import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  isModalVisible = false;
  selectedCliente: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  clientes = [
    { id: 1, nombre: 'Jane Cooper', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc1', estatus: 'Activo' },
    { id: 2, nombre: 'Wade Warren', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc2', estatus: 'Activo' },
    { id: 3, nombre: 'Esther Howard', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc3', estatus: 'Activo' },
    { id: 4, nombre: 'Cameron Williamson', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc2', estatus: 'Activo' },
    { id: 5, nombre: 'Leslie Alexander', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc1', estatus: 'Activo' },
    { id: 6, nombre: 'Guy Hawkins', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc4', estatus: 'Activo' },
    { id: 7, nombre: 'Jacob Jones', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc2', estatus: 'Activo' },
    { id: 8, nombre: 'Darlene Robertson', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc4', estatus: 'Activo' },
    { id: 9, nombre: 'Devon Lane', telefono: '000-000-0000', email: 'example@example.com', sucursal: 'Suc1', estatus: 'Activo' }
  ];

  openNewClienteModal() {
    this.selectedCliente = { nombre: '', telefono: '', email: '', sucursal: '', estatus: 'Activo' };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  openModal(cliente: any, action: string) {
    this.selectedCliente = { ...cliente };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedCliente = null;
    this.modalAction = '';
  }

  saveCliente() {
    if (this.modalAction === 'edit') {
      const index = this.clientes.findIndex(c => c.id === this.selectedCliente.id);
      if (index !== -1) {
        this.clientes[index] = { ...this.selectedCliente };
      }
    } else if (this.modalAction === 'new') {
      const newId = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.id)) + 1 : 1;
      this.clientes.unshift({ id: newId, ...this.selectedCliente });
    }
    this.closeModal();
  }

  deleteCliente() {
    this.clientes = this.clientes.filter(c => c.id !== this.selectedCliente.id);
    this.closeModal();
  }
}
