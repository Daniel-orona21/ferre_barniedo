import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-rol',
  imports: [],
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.scss'
})
export class CrearRolComponent {

  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/app/roles-y-permisos']);
  }

}
