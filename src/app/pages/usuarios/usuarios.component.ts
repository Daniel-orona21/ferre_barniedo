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
  public estatus = [
    { label: 'Activos', active: false },
    { label: 'Inactivos', active: false },
    { label: 'Todos', active: true },
  ];

  users = [
    { id: 1, nombre: 'Juan Perez', correo: 'aaa@gmail.com', area: 'Legal', rol: 'Administrador', sucursal: 'Monclova', estatus: 'Activo' },
    { id: 2, nombre: 'Elisa Lopez', correo: 'aaa@gmail.com', area: 'Finanzas', rol: 'Supervisor', sucursal: 'Ecatepec', estatus: 'Activo' },
    { id: 3, nombre: 'Luis Gomez', correo: 'aaa@gmail.com', area: 'Operaciones', rol: 'Director', sucursal: 'San Luis Potosí', estatus: 'Activo' },
    { id: 4, nombre: 'Ana Torres', correo: 'ana@gmail.com', area: 'Legal', rol: 'Administrador', sucursal: 'Monclova', estatus: 'Inactivo' },
    { id: 5, nombre: 'Carlos Ruiz', correo: 'carlos@gmail.com', area: 'Finanzas', rol: 'Supervisor', sucursal: 'Ecatepec', estatus: 'Inactivo' },
    { id: 6, nombre: 'Marta Diaz', correo: 'marta@gmail.com', area: 'Operaciones', rol: 'Director', sucursal: 'San Luis Potosí', estatus: 'Inactivo' },
  ];

  searchTerm: string = '';

  get filteredUsers() {
    let filtered = this.users;
    const activeFilter = this.estatus.find(e => e.active)?.label;
    if (activeFilter === 'Activos') {
      filtered = filtered.filter(u => u.estatus === 'Activo');
    } else if (activeFilter === 'Inactivos') {
      filtered = filtered.filter(u => u.estatus === 'Inactivo');
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(u =>
        u.nombre.toLowerCase().includes(term) ||
        (u.correo && u.correo.toLowerCase().includes(term)) ||
        u.area.toLowerCase().includes(term) ||
        u.rol.toLowerCase().includes(term) ||
        u.sucursal.toLowerCase().includes(term)
      );
    }
    return filtered;
  }

  openNewUserModal() {
    this.selectedUser = { nombre: '', sucursal: '', area: '', rol: '', estatus: 'Activo' };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  selectEstatus(estatus: any): void {
    this.estatus.forEach(p => p.active = false);
    estatus.active = true;
    this.updateDataForPeriod();
  }

  updateDataForPeriod() {
    // El filtrado ahora es reactivo a través de filteredUsers
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