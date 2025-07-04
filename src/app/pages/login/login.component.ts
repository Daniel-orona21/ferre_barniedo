import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public showForgotPassword = false;
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    if (this.authService.login(this.email, this.password)) {
      const user = this.authService.currentUserValue;
      // Redirigir según el rol
      if (user?.role === 'admin') {
        this.router.navigate(['/app/dashboard']);
      } else {
        this.router.navigate(['/app/recibos']);
      }
    } else {
      this.errorMessage = 'Por favor, ingresa email y contraseña válidos';
    }
  }
}
