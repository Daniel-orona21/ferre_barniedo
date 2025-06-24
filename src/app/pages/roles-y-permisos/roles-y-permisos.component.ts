import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-y-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles-y-permisos.component.html',
  styleUrl: './roles-y-permisos.component.scss'
})
export class RolesYPermisosComponent {
  isModalVisible = false;
  selectedRole: any = null;
  modalAction = ''; // 'view', 'edit', or 'delete'

  roles = [
    { id: 1, rol: 'Administrador', estatus: 'Activo' },
    { id: 2, rol: 'Almacenista', estatus: 'Activo' },
    { id: 3, rol: 'Aseguradora', estatus: 'Activo' },
    { id: 4, rol: 'Comprador', estatus: 'Activo' },
    { id: 5, rol: 'Contador', estatus: 'Activo' },
    { id: 6, rol: 'Gestor de devoluciones y cancelaciones', estatus: 'Activo' },
    { id: 7, rol: 'Usuario especial', estatus: 'Activo' },
    { id: 8, rol: 'Validador de almacen', estatus: 'Activo' },
    { id: 9, rol: 'Vendedor', estatus: 'Activo' }
  ];

  constructor(private router: Router) {}

  newRole() {
    this.router.navigate(['/app/roles-y-permisos/crear']);
  }

  openModal(role: any, action: string) {
    this.selectedRole = { ...role };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedRole = null;
    this.modalAction = '';
  }

  saveRole() {
    const index = this.roles.findIndex(r => r.id === this.selectedRole.id);
    if (index !== -1) {
      this.roles[index] = { ...this.selectedRole };
    }
    this.closeModal();
  }

  deleteRole() {
    this.roles = this.roles.filter(r => r.id !== this.selectedRole.id);
    this.closeModal();
  }
}
