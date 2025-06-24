import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isNavCollapsed = false;
  showUserMenu = false;
  notificationCount = 3;
  currentRole: string = '';

  constructor(
    private router: Router, 
    private eRef: ElementRef,
  ) {}


  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.showUserMenu &&
      !this.eRef.nativeElement.querySelector('.user-menu')?.contains(target) &&
      !this.eRef.nativeElement.querySelector('.arrow-user-menu')?.contains(target)
    ) {
      this.showUserMenu = false;
    }
  }

  // getCurrentPageTitle() {
  //   const currentRoute = this.router.url;
  //   return currentRoute.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  // }
}
