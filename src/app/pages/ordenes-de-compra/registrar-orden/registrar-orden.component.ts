import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-orden',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-orden.component.html',
  styleUrl: './registrar-orden.component.scss'
})
export class RegistrarOrdenComponent {
  
  ordenCompra = {
    fecha: '',
    oc: '',
    proveedor: '',
    procedencia: '',
    cantidadRecibir: 0,
    precioTotal: '',
    ubicacion: '',
    solicitante: '',
    observaciones: '',
    estatus: 'Pendiente'
  };

  constructor(private router: Router) {
    // Establecer fecha actual por defecto
    const today = new Date();
    this.ordenCompra.fecha = today.toISOString().split('T')[0];
  }

  guardarOrden() {
    // Validar campos requeridos
    if (!this.ordenCompra.fecha || !this.ordenCompra.oc || !this.ordenCompra.proveedor || 
        !this.ordenCompra.ubicacion || !this.ordenCompra.solicitante) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Aquí iría la lógica para guardar en el backend
    console.log('Guardando orden de compra:', this.ordenCompra);
    
    // Simular guardado exitoso
    alert('Orden de compra registrada exitosamente');
    
    // Redirigir de vuelta a la lista de órdenes
    this.router.navigate(['/app/ordenes']);
  }

  goBack() {
    this.router.navigate(['/app/ordenes']);
  }
}
