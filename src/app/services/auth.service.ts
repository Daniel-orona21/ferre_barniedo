import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'empleado';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    // Simulación de autenticación
    if (email && password) {
      const user: User = {
        email: email,
        name: this.extractNameFromEmail(email),
        role: this.determineRole(email)
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      
      // Mostrar mensaje de bienvenida personalizado
      const roleMessage = user.role === 'admin' ? 
        'Administrador - Acceso completo al sistema' : 
        'Empleado - Acceso a recibos y perfil';
      console.log(`Bienvenido ${user.name} (${roleMessage})`);
      
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  private determineRole(email: string): 'admin' | 'empleado' {
    // Lógica para determinar rol basado en email
    // Emails de administrador (pueden ver todos los tabs)
    const adminEmails = [
      'daniel@gmail.com', 
      'admin@empresa.com', 
      'admin@gmail.com',
      'administrador@test.com'
    ];
    
    // Cualquier otro email será considerado empleado (solo puede ver recibos y perfil)
    return adminEmails.includes(email) ? 'admin' : 'empleado';
  }

  private extractNameFromEmail(email: string): string {
    // Extraer nombre del email (antes del @)
    return email.split('@')[0].replace(/[0-9]/g, '').replace(/[._]/g, ' ');
  }
} 