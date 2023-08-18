import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './listaHeroe', color: 'blue' },
    { label: 'Crear', icon: 'add', url: './nuevoHeroe' , color: 'red'},
  ];

  constructor(
    private router: Router
  ) {}

  get user():any | undefined {
    return 'Bailon';
  }

  onLogout() {
    this.router.navigate(['/auth/login'])
  }
}
