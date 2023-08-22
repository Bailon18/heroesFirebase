import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contenedor } from './pages/contenedor/contenedor';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path: '',
    component: Contenedor,
    children: [
      { path: 'nuevoHeroe', component: NuevoComponent },
      { path: 'editHeroe/:id', component: NuevoComponent },
      { path: 'listaHeroe', component: ListarComponent },
      { path: '**', redirectTo: 'listaHeroe' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragonballRoutingModule { }
