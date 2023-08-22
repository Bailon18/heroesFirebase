import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragonballRoutingModule } from './dragonball-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Contenedor } from './pages/contenedor/contenedor';


@NgModule({
  declarations: [
    ListarComponent,
    NuevoComponent,
    Contenedor
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragonballRoutingModule,
    MaterialModule
  ]
})
export class DragonballModule { }
