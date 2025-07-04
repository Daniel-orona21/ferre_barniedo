import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerModule, BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { RecibosService } from '../../../services/recibos.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lista-recibos',
  standalone: true,
  imports: [CommonModule, FormsModule, BsDatepickerModule],
  templateUrl: './lista-recibos.component.html',
  styleUrl: './lista-recibos.component.scss'
})
export class ListaRecibosComponent {

  isModalVisible = false;
  selectedOrdenCompra: any = null;
  modalAction = ''; // 'view', 'edit', 'delete', or 'new'

  // Filtros
  filtroUsuario: string = '';
  filtroSucursal: string = '';
  filtroEstatus: string = '';
  filtroBusqueda: string = '';

  todasLasOrdenes: any[] = [];
  ordenesCompra: any[] = [];
  fechaDesde: Date | undefined;
  fechaHasta: Date | undefined;

  bsConfig: Partial<BsDatepickerConfig>;

  get rol(): string | undefined {
    return this.authService.currentUserValue?.role;
  }

  constructor(
    private localeService: BsLocaleService, 
    private router: Router,
    private recibosService: RecibosService,
    private authService: AuthService
  ) {
    defineLocale('es', esLocale);
    this.localeService.use('es');
    this.bsConfig = Object.assign({}, { 
      containerClass: 'theme-dark-custom',
      dateInputFormat: 'DD/MM/YYYY'
    });
    
    // Cargar datos del servicio según el rol del usuario
    this.todasLasOrdenes = this.recibosService.getAllRecibos(this.authService.currentUserValue?.role);
    this.ordenesCompra = [...this.todasLasOrdenes];
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
    if (action === 'view') {
      // Navegar a la vista de detalle con el ID del recibo
      this.router.navigate(['/app/recibos', ordenCompra.id]);
    } else {
      this.selectedOrdenCompra = { ...ordenCompra };
      this.modalAction = action;
      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedOrdenCompra = null;
    this.modalAction = '';
  }

  saveOrdenCompra() {
    if (this.modalAction === 'edit') {
      this.recibosService.updateRecibo(this.selectedOrdenCompra);
      // Recargar datos
      this.todasLasOrdenes = this.recibosService.getAllRecibos(this.authService.currentUserValue?.role);
      this.aplicarFiltros();
    } else if (this.modalAction === 'new') {
      this.recibosService.addRecibo(this.selectedOrdenCompra);
      // Recargar datos
      this.todasLasOrdenes = this.recibosService.getAllRecibos(this.authService.currentUserValue?.role);
      this.aplicarFiltros();
    }
    this.closeModal();
  }

  deleteOrdenCompra() {
    this.recibosService.deleteRecibo(this.selectedOrdenCompra.id);
    // Recargar datos
    this.todasLasOrdenes = this.recibosService.getAllRecibos(this.authService.currentUserValue?.role);
    this.aplicarFiltros();
    this.closeModal();
  }
} 