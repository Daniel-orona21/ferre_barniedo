import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  isModalVisible = false;
  selectedUser: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  users = [
    { id: 1, nombre: 'Jane Cooper', sucursal: 'Suc1', area: 'Finanzas', rol: 'Administrador', estatus: 'Activo' },
    { id: 2, nombre: 'Wade Warren', sucursal: 'Suc2', area: 'Finanzas', rol: 'Administrador', estatus: 'Activo' },
    { id: 3, nombre: 'Esther Howard', sucursal: 'Suc3', area: 'Finanzas', rol: 'Administrador', estatus: 'Activo' },
    { id: 4, nombre: 'Cameron Williamson', sucursal: 'Suc2', area: 'Administración', rol: 'Supervisor', estatus: 'Activo' },
    { id: 5, nombre: 'Leslie Alexander', sucursal: 'Suc1', area: 'Administración', rol: 'Supervisor', estatus: 'Activo' },
    { id: 6, nombre: 'Guy Hawkins', sucursal: 'Suc4', area: 'Finanzas', rol: 'Administrador', estatus: 'Activo' },
    { id: 7, nombre: 'Jacob Jones', sucursal: 'Suc2', area: 'Almacen', rol: 'Almacen', estatus: 'Activo' },
    { id: 8, nombre: 'Darlene Robertson', sucursal: 'Suc4', area: 'Administración', rol: 'Supervisor', estatus: 'Activo' },
    { id: 9, nombre: 'Devon Lane', sucursal: 'Suc1', area: 'Administración', rol: 'Supervisor', estatus: 'Activo' }
  ];

  openNewUserModal() {
    this.selectedUser = { nombre: '', sucursal: '', area: '', rol: '', estatus: 'Activo' };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  openModal(user: any, action: string) {
    this.selectedUser = { ...user };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedUser = null;
    this.modalAction = '';
  }

  saveUser() {
    if (this.modalAction === 'edit') {
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
      }
    } else if (this.modalAction === 'new') {
      const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
      this.users.unshift({ id: newId, ...this.selectedUser });
    }
    this.closeModal();
  }

  deleteUser() {
    this.users = this.users.filter(u => u.id !== this.selectedUser.id);
    this.closeModal();
  }
}
