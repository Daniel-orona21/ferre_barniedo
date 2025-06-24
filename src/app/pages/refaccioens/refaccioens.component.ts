import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-refaccioens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './refaccioens.component.html',
  styleUrl: './refaccioens.component.scss'
})
export class RefaccioensComponent {
  isModalVisible = false;
  selectedRefaccion: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  refacciones = [
    { id: 1, producto: 'Filtro de aire', sku: '40161', familia: 'Filtros', modelo: 'Fiat mobi', anios: '2020-2024', costo: '$150.00', estatus: 'Activo' },
    { id: 2, producto: 'Pastillas de freno', sku: '20254', familia: 'Frenos', modelo: 'Jeep Compass', anios: '2018-2023', costo: '$580.00', estatus: 'Activo' },
    { id: 3, producto: 'Alternador', sku: '45879', familia: 'Eléctrico', modelo: 'Dodge attitude', anios: '2017-2021', costo: '$2,200.00', estatus: 'Activo' },
    { id: 4, producto: 'Amortiguador', sku: '26754', familia: 'Suspensión', modelo: 'RAM 700', anios: '2015-2020', costo: '$980.00', estatus: 'Activo' },
    { id: 5, producto: 'Espejo lateral der', sku: '25712', familia: 'Carrocería', modelo: 'Peugeot 301', anios: '2015-2020', costo: '$420.00', estatus: 'Activo' },
    { id: 6, producto: 'Espejo lateral izq', sku: '40163', familia: 'Carrocería', modelo: 'Peugeot 301', anios: '2022-2024', costo: '$710.00', estatus: 'Activo' },
    { id: 7, producto: 'Disco de freno', sku: '411119', familia: 'Frenos', modelo: 'Fiat Argo', anios: '2018-2023', costo: '$860.00', estatus: 'Activo' },
    { id: 8, producto: 'Sensor ABS', sku: '25172', familia: 'Eléctrico', modelo: 'Jeep Renegade', anios: '2019-2024', costo: '$640.00', estatus: 'Activo' },
    { id: 9, producto: 'Compresor de A/A', sku: '40101', familia: 'A/A', modelo: 'Dodge Journey', anios: '2011-2019', costo: '$3,800.00', estatus: 'Activo' },
    { id: 10, producto: 'Filtro de gasolina', sku: '40162', familia: 'Filtros', modelo: 'RAM ProMaster', anios: '2015-2020', costo: '$190.00', estatus: 'Activo' }
  ];

  openNewRefaccionModal() {
    this.selectedRefaccion = { producto: '', sku: '', familia: '', modelo: '', anios: '', costo: '', estatus: 'Activo' };
    this.modalAction = 'new';
    this.isModalVisible = true;
  }

  openModal(refaccion: any, action: string) {
    this.selectedRefaccion = { ...refaccion };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedRefaccion = null;
    this.modalAction = '';
  }

  saveRefaccion() {
    if (this.modalAction === 'edit') {
      const index = this.refacciones.findIndex(r => r.id === this.selectedRefaccion.id);
      if (index !== -1) {
        this.refacciones[index] = { ...this.selectedRefaccion };
      }
    } else if (this.modalAction === 'new') {
      const newId = this.refacciones.length > 0 ? Math.max(...this.refacciones.map(r => r.id)) + 1 : 1;
      this.refacciones.unshift({ id: newId, ...this.selectedRefaccion });
    }
    this.closeModal();
  }

  deleteRefaccion() {
    this.refacciones = this.refacciones.filter(r => r.id !== this.selectedRefaccion.id);
    this.closeModal();
  }
}
