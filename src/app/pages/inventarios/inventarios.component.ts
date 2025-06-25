import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventariosComponent {

}
