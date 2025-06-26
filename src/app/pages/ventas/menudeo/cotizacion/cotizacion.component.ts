import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Producto {
  sku: string;
  nombre: string;
  cantidad: number;
  um: string;
  precioUnitario: number;
  descuentoPorcentaje: number;
  subtotal: number;
  descuentoMonto: number;
  total: number;
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {

  constructor(private router: Router) {}
  
  cantidadPrincipal = 2;
  productos: Producto[] = [];

  subtotalVentas = 0;
  descuentos = 0;
  totalVentas = 0;

  ngOnInit(): void {
    this.productos = [
      { sku: '40161', nombre: 'Filtro air - Fiat mobil - 2020-2024', cantidad: 2, um: 'PZ', precioUnitario: 150, descuentoPorcentaje: 30, subtotal: 0, descuentoMonto: 0, total: 0 },
      { sku: '20254', nombre: 'Pastilla de freno - Fiat mobil - 2020-2024', cantidad: 4, um: 'PZ', precioUnitario: 580, descuentoPorcentaje: 10, subtotal: 0, descuentoMonto: 0, total: 0 },
      { sku: '8459', nombre: 'Amortiguador Fiat mobil - 2020-2024', cantidad: 4, um: 'PZ', precioUnitario: 980, descuentoPorcentaje: 25, subtotal: 0, descuentoMonto: 0, total: 0 },
      { sku: '48570', nombre: 'Filtro de gasolina - Fiat mobil - 2020-2024', cantidad: 1, um: 'PZ', precioUnitario: 150, descuentoPorcentaje: 0, subtotal: 0, descuentoMonto: 0, total: 0 },
    ];
    this.actualizarTodosLosCalculos();
  }

  // --- Métodos para la tabla de productos ---

  incrementarCantidad(producto: Producto): void {
    producto.cantidad++;
    this.actualizarTodosLosCalculos();
  }

  decrementarCantidad(producto: Producto): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.actualizarTodosLosCalculos();
    }
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
    this.actualizarTodosLosCalculos();
  }

  // --- Métodos de cálculo ---

  actualizarCalculosProducto(producto: Producto): void {
    producto.subtotal = producto.cantidad * producto.precioUnitario;
    producto.descuentoMonto = producto.subtotal * (producto.descuentoPorcentaje / 100);
    producto.total = producto.subtotal - producto.descuentoMonto;
  }

  actualizarTotalesGenerales(): void {
    this.subtotalVentas = this.productos.reduce((acc, p) => acc + p.subtotal, 0);
    this.descuentos = this.productos.reduce((acc, p) => acc + p.descuentoMonto, 0);
    this.totalVentas = this.productos.reduce((acc, p) => acc + p.total, 0);
  }

  actualizarTodosLosCalculos(): void {
    this.productos.forEach(p => this.actualizarCalculosProducto(p));
    this.actualizarTotalesGenerales();
  }

  // --- Métodos para el formulario principal (simulado) ---

  incrementarCantidadPrincipal(): void {
    this.cantidadPrincipal++;
  }

  decrementarCantidadPrincipal(): void {
    if (this.cantidadPrincipal > 1) {
      this.cantidadPrincipal--;
    }
  }

  regresar(): void {
    this.router.navigate(['/app/ventas']);
  }
}
