import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-y-permisos',
  imports: [],
  templateUrl: './roles-y-permisos.component.html',
  styleUrl: './roles-y-permisos.component.scss'
})
export class RolesYPermisosComponent {

  constructor(private router: Router) {}

  newRole() {
    this.router.navigate(['/app/roles-y-permisos/crear']);
  }

}
