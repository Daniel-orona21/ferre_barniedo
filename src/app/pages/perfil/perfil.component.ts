import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  // Datos del usuario (obtenidos del AuthService)
  usuario = {
    nombre: '',
    email: '',
    telefono: '+52 618 123 4567',
    puesto: '',
    sucursal: 'Sucursal Centro',
    fechaRegistro: new Date('2023-01-15'),
    avatar: 'images/logo.png'
  };

  // Configuraciones
  configuracion = {
    notificaciones: {
      email: true,
      push: true,
      reportes: false,
      alertas: true
    },
    privacidad: {
      perfilPublico: false,
      mostrarTelefono: true,
      compartirEstadisticas: false
    },
    preferencias: {
      tema: 'oscuro',
      idioma: 'es',
      zona: 'America/Mexico_City'
    }
  };

  // Estados de la interfaz
  editandoPerfil = false;
  cambiandoContrasena = false;
  guardandoCambios = false;

  // Datos temporales para edición
  usuarioTemp = { ...this.usuario };
  contrasenaTemporal = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.usuario = {
          nombre: user.name,
          email: user.email,
          telefono: '+52 618 123 4567',
          puesto: this.getRoleDisplayName(),
          sucursal: 'Sucursal Centro',
          fechaRegistro: new Date('2023-01-15'),
          avatar: 'images/logo.png'
        };
        this.usuarioTemp = { ...this.usuario };
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  // Métodos para manejar la interfaz
  toggleEditarPerfil() {
    this.editandoPerfil = !this.editandoPerfil;
    if (this.editandoPerfil) {
      this.usuarioTemp = { ...this.usuario };
    }
  }

  guardarCambiosPerfil() {
    this.guardandoCambios = true;
    // Simular guardado - solo actualizar campos editables
    setTimeout(() => {
      this.usuario.telefono = this.usuarioTemp.telefono;
      this.usuario.sucursal = this.usuarioTemp.sucursal;
      this.editandoPerfil = false;
      this.guardandoCambios = false;
    }, 1000);
  }

  cancelarEdicion() {
    this.editandoPerfil = false;
    this.usuarioTemp = { ...this.usuario };
  }

  toggleCambiarContrasena() {
    this.cambiandoContrasena = !this.cambiandoContrasena;
    if (!this.cambiandoContrasena) {
      this.contrasenaTemporal = {
        actual: '',
        nueva: '',
        confirmar: ''
      };
    }
  }

  cambiarContrasena() {
    if (this.contrasenaTemporal.nueva === this.contrasenaTemporal.confirmar) {
      this.guardandoCambios = true;
      // Simular cambio de contraseña
      setTimeout(() => {
        this.cambiandoContrasena = false;
        this.contrasenaTemporal = {
          actual: '',
          nueva: '',
          confirmar: ''
        };
        this.guardandoCambios = false;
      }, 1000);
    }
  }

  actualizarConfiguracion(seccion: string, campo: string, valor: any) {
    (this.configuracion as any)[seccion][campo] = valor;
    // Simular guardado automático
    console.log('Configuración actualizada:', seccion, campo, valor);
  }

  exportarDatos() {
    // Simular exportación de datos
    console.log('Exportando datos del usuario...');
  }

  eliminarCuenta() {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Eliminando cuenta...');
    }
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRoleDisplayName(): string {
    if (!this.currentUser) return 'Usuario';
    return this.currentUser.role === 'admin' ? 'Administrador' : 'Empleado';
  }
}
