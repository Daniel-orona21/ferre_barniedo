import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.currentUserValue;
    
    if (!user) {
      this.router.navigate(['/']);
      return false;
    }

    const requiredRole = route.data?.['role'];
    if (!requiredRole) {
      return true; // Si no hay rol requerido, permite el acceso
    }

    // Verificar si el usuario tiene el rol requerido
    if (requiredRole === 'admin' && user.role !== 'admin') {
      // Mostrar mensaje de acceso denegado y redirigir
      alert('Acceso denegado. No tienes permisos para acceder a esta sección.');
      this.router.navigate(['/app/recibos']); // Redirige a recibos si no es admin
      return false;
    }

    return true;
  }
} 