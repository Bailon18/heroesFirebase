import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './contenedor.html',
  styles: [
  ]
})
export class Contenedor implements OnInit{

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './listaHeroe', color: 'blue' },
    { label: 'Crear', icon: 'add', url: './nuevoHeroe' , color: 'red'},
  ];

  nombre: string=""
  rol: string=""

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const usuarioo = localStorage.getItem('usuariolog');
    if (usuarioo) {

      const data = JSON.parse(usuarioo);
      this.nombre = data.nombre;
      this.rol = data.rol;
    }
  }


  onLogout() {

    localStorage.removeItem('usuariolog');
    this.router.navigate(['/auth/login']);
  }

}
