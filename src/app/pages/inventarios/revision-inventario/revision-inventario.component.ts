import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-revision-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revision-inventario.component.html',
  styleUrl: './revision-inventario.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RevisionInventarioComponent implements AfterViewInit {
  isModalVisible = false;
  selectedInventario: any = null;
  modalAction = ''; // 'view' or 'edit'
  activeView: 'aleatorio' | 'anual' = 'aleatorio';

  @ViewChild('indicator') indicator!: ElementRef<HTMLDivElement>;
  @ViewChild('aleatorioOption') aleatorioOption!: ElementRef<HTMLDivElement>;

  inventarios = [
    { fecha: '25/06/2025', almacen: 'Guadalajara', almacenProceso: 'Guadalajara', anaquel: 'A-VA23489', cantidadRegistrada: 100, cantidadReportada: 100, usuario: 'Usuario1', usuarioValidador: 'Supervisor9', estatus: 'Correcto' },
    { fecha: '25/06/2025', almacen: 'Colima', almacenProceso: 'Colima', anaquel: 'BE-HR1498', cantidadRegistrada: 20, cantidadReportada: 20, usuario: 'Usuario14', usuarioValidador: 'Supervisor2', estatus: 'Correcto' },
    { fecha: '25/06/2025', almacen: 'CD Guzman', almacenProceso: 'CD Guzman', anaquel: 'CA-REF0002', cantidadRegistrada: 20, cantidadReportada: 0, usuario: 'Usuario11', usuarioValidador: 'Supervisor4', estatus: 'Discrepancias' },
    { fecha: '24/06/2025', almacen: 'Manzanillo', almacenProceso: 'Manzanillo', anaquel: 'MX-05891', cantidadRegistrada: 40, cantidadReportada: 39, usuario: 'Usuario10', usuarioValidador: 'Supervisor3', estatus: 'Pendientes' },
    { fecha: '24/06/2025', almacen: 'Colima', almacenProceso: 'Colima', anaquel: 'JEE-DF2500', cantidadRegistrada: 70, cantidadReportada: 70, usuario: 'Usuario14', usuarioValidador: 'Supervisor2', estatus: 'Correcto' },
    { fecha: '24/06/2025', almacen: 'Zapopan', almacenProceso: 'Acueducto', anaquel: 'ELE-JP025', cantidadRegistrada: 50, cantidadReportada: 50, usuario: 'Usuario3', usuarioValidador: 'Supervisor1', estatus: 'Correcto' },
    { fecha: '23/06/2025', almacen: 'Guadalajara', almacenProceso: 'Guadalajara', anaquel: 'DOD-GR002', cantidadRegistrada: 20, cantidadReportada: 20, usuario: 'Usuario1', usuarioValidador: 'Supervisor9', estatus: 'Correcto' },
    { fecha: '16/06/2025', almacen: 'Zapopan', almacenProceso: 'Acueducto', anaquel: 'ELE-JP100', cantidadRegistrada: 80, cantidadReportada: 80, usuario: 'Usuario3', usuarioValidador: 'Supervisor1', estatus: 'Correcto' },
    { fecha: '16/06/2025', almacen: 'Guadalajara', almacenProceso: 'Guadalajara', anaquel: 'JEP-CA003', cantidadRegistrada: 90, cantidadReportada: 90, usuario: 'Usuario1', usuarioValidador: 'Supervisor9', estatus: 'Correcto' },
    { fecha: '13/06/2025', almacen: 'Guadalajara', almacenProceso: 'Guadalajara', anaquel: 'FIA-MB0258', cantidadRegistrada: 100, cantidadReportada: 100, usuario: 'Usuario1', usuarioValidador: 'Supervisor9', estatus: 'Correcto' }
  ];

  inventariosAnual = [
    { fecha: '01/01/2025', almacen: 'General', almacenProceso: 'Todos', anaquel: 'ANUAL-001', cantidadRegistrada: 1500, cantidadReportada: 1490, usuario: 'Admin', usuarioValidador: 'SupervisorG', estatus: 'Discrepancias' },
    { fecha: '01/01/2025', almacen: 'Guadalajara', almacenProceso: 'Todos', anaquel: 'ANUAL-002', cantidadRegistrada: 800, cantidadReportada: 800, usuario: 'Admin', usuarioValidador: 'Supervisor1', estatus: 'Correcto' },
    { fecha: '01/01/2025', almacen: 'Colima', almacenProceso: 'Todos', anaquel: 'ANUAL-003', cantidadRegistrada: 450, cantidadReportada: 450, usuario: 'Admin', usuarioValidador: 'Supervisor2', estatus: 'Correcto' },
    { fecha: '01/01/2025', almacen: 'CD Guzman', almacenProceso: 'Todos', anaquel: 'ANUAL-004', cantidadRegistrada: 250, cantidadReportada: 245, usuario: 'Admin', usuarioValidador: 'Supervisor4', estatus: 'Discrepancias' }
  ];

  get activeInventarios() {
    return this.activeView === 'aleatorio' ? this.inventarios : this.inventariosAnual;
  }

  ngAfterViewInit() {
    // We need a timeout to ensure the element is rendered before we measure it
    setTimeout(() => {
      this.setActiveView('aleatorio', this.aleatorioOption.nativeElement);
    }, 0);
  }

  setActiveView(view: 'aleatorio' | 'anual', element: HTMLElement) {
    this.activeView = view;
    if (this.indicator && element) {
      this.indicator.nativeElement.style.width = `${element.offsetWidth}px`;
      this.indicator.nativeElement.style.left = `${element.offsetLeft}px`;
    }
  }

  openModal(item: any, action: string) {
    this.selectedInventario = { ...item };
    this.modalAction = action;
    this.isModalVisible = true;
  }

  openNewInventarioModal() {
    this.selectedInventario = {
      fecha: '',
      almacen: '',
      almacenProceso: '',
      anaquel: '',
      cantidadRegistrada: 0,
      cantidadReportada: 0,
      usuario: '',
      usuarioValidador: '',
      estatus: 'Pendientes'
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
      this.activeInventarios.push({ ...this.selectedInventario });
    } else {
      const index = this.activeInventarios.findIndex(i => i.anaquel === this.selectedInventario.anaquel);
      if (index !== -1) {
        this.activeInventarios[index] = { ...this.selectedInventario };
      }
    }
    this.closeModal();
  }
}
