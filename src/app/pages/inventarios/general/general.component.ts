import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralComponent {
  isModalVisible = false;
  selectedInventario: any = null;
  modalAction = ''; // 'view' or 'edit'

  inventarios = [
    { producto: 'Filtro de aire', sku: '40161', familia: 'Filtros', modelo: 'Fiat mobi', anios: '2020-2024', costo: '$150.00', cant: 50, um: 'PZ', min: 20, max: 100, estatus: 'Disponible' },
    { producto: 'Pastillas de freno', sku: '20254', familia: 'Frenos', modelo: 'Jeep Compass', anios: '2018-2023', costo: '$580.00', cant: 80, um: 'PZ', min: 20, max: 110, estatus: 'Disponible' },
    { producto: 'Alternador', sku: '27642', familia: 'Eléctrico', modelo: 'Dodge Attitude', anios: '2017-2021', costo: '$2,200.00', cant: 25, um: 'PZ', min: 20, max: 80, estatus: 'Disponible' },
    { producto: 'Alternador', sku: '45879', familia: 'Eléctrico', modelo: 'Dodge Attitude', anios: '2022-2025', costo: '$2,500.00', cant: 10, um: 'PZ', min: 20, max: 80, estatus: 'Bajo Stock' },
    { producto: 'Amortiguador', sku: '26754', familia: 'Suspensión', modelo: 'RAM 700', anios: '2015-2020', costo: '$980.00', cant: 0, um: 'PZ', min: 10, max: 30, estatus: 'Agotado' },
    { producto: 'Amortiguador', sku: '26755', familia: 'Suspensión', modelo: 'RAM 700', anios: '2021-2024', costo: '$989.00', cant: 5, um: 'PZ', min: 10, max: 30, estatus: 'Bajo Stock' },
    { producto: 'Disco de freno', sku: '411119', familia: 'Frenos', modelo: 'Fiat Argo', anios: '2018-2023', costo: '$860.00', cant: 40, um: 'PZ', min: 20, max: 100, estatus: 'Disponible' },
    { producto: 'Compresor A/A', sku: '40101', familia: 'A/A', modelo: 'Dodge Journey', anios: '2011-2019', costo: '$3,800.00', cant: 45, um: 'PZ', min: 10, max: 30, estatus: 'Sobrestock' },
    { producto: 'Sensor ABS', sku: '25377', familia: 'Eléctrico', modelo: 'Jeep Renegade', anios: '2019-2024', costo: '$640.00', cant: 60, um: 'PZ', min: 20, max: 100, estatus: 'Disponible' }
  ];

  openModal(item: any, action: string) {
    this.selectedInventario = { ...item };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedInventario = null;
    this.modalAction = '';
  }

  saveInventario() {
    const index = this.inventarios.findIndex(i => i.sku === this.selectedInventario.sku);
    if (index !== -1) {
      this.inventarios[index] = { ...this.selectedInventario };
    }
    this.closeModal();
  }
}
