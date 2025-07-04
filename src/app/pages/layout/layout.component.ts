import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LayoutComponent implements OnInit, OnDestroy {
  isNavCollapsed = false;
  showUserMenu = false;
  notificationCount = 3;
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(
    public router: Router, 
    private eRef: ElementRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      
      // Redirigir automáticamente según el rol si está en la ruta raíz de la app
      if (user && this.router.url === '/app') {
        if (user.role === 'admin') {
          this.router.navigate(['/app/dashboard']);
        } else {
          this.router.navigate(['/app/recibos']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.showUserMenu &&
      !this.eRef.nativeElement.querySelector('.user-menu')?.contains(target) &&
      !this.eRef.nativeElement.querySelector('.letras')?.contains(target)
    ) {
      this.showUserMenu = false;
    }
  }

  getCurrentPageTitle() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('dashboard')) {
      return 'Dashboard';
    }
    if (currentRoute.includes('usuarios')) {
      return 'Usuarios';
    }
    if (currentRoute.includes('recibos')) {
      return 'Recibos';
    }
    if (currentRoute.includes('reporte')) {
      return 'Reportes';
    }
    if (currentRoute.includes('perfil')) {
      return 'Perfil';
    }
    return '';
  }

  // Método para verificar si el usuario puede ver un tab específico
  canViewTab(tab: string): boolean {
    if (!this.currentUser) return false;
    
    if (this.currentUser.role === 'admin') {
      return true; // Admin puede ver todos los tabs
    }
    
    if (this.currentUser.role === 'empleado') {
      return tab === 'recibos' || tab === 'perfil'; // Empleado solo puede ver recibos y perfil
    }
    
    return false;
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'DO';
    return this.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getRoleDisplayName(): string {
    if (!this.currentUser) return 'Usuario';
    return this.currentUser.role === 'admin' ? 'Administrador' : 'Empleado';
  }
}
