import { HeroeService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Habilidad } from '../../model/habilidad';
import { listaDeHabilidades, listaDePoderes } from '../../data/data';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  titulo: string = 'Nuevo Heroe';
  tituloBoton: string = 'Guardar heroe';
  idHeroeEdi!: string;

  public nuevoheroeForm: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    alias: ['', [Validators.required]],
    poderes: ['Super fuerza', [Validators.required]],
    descripcion: ['', [Validators.required]],
    habilidad: [1, [Validators.required]],
  });

  habilidades = listaDeHabilidades;
  poderes = listaDePoderes;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private heroeService: HeroeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idHeroe = params.get('id');
      if (idHeroe !== null) {
        this.idHeroeEdi = idHeroe;
      }
    });

    if (this.idHeroeEdi != null) {
      this.titulo = 'Editar Heroe';
      this.tituloBoton = 'Actualizar';

      // llamar al serrvicio de buscar heroe por id
      this.heroeService.obtenerHeroePorId(this.idHeroeEdi).subscribe({
        next: (data) => {
  
          this.nuevoheroeForm.setValue({
            id: this.idHeroeEdi,
            nombre: data.nombre,
            alias: data.alias,
            poderes: data.poderes,
            descripcion: data.descripcion,
            habilidad: data.habilidad
          });
          
        },
        error: (error) => {
          alert('Error al consultar por el id del héroe:' + error);
        },
      });
    }
  }

  guardarHeroe() {
    if (this.nuevoheroeForm.valid) {
      if (this.idHeroeEdi) {
        this.actualizarHeroe();
      } else {
        this.crearNuevoHeroe();
      }
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }
  
  actualizarHeroe() {
    const datosActualizados = this.nuevoheroeForm.value;
    this.heroeService.actualizarHeroe(this.idHeroeEdi, datosActualizados)
      .then(() => {
        alert('Héroe actualizado exitosamente');
        this.retornarListado();
      })
      .catch((error) => {
        alert('Error al actualizar el héroe:' + error);
      });
  }
  
  crearNuevoHeroe() {
    const nuevoHeroe = this.nuevoheroeForm.value;
    this.heroeService.guardarHeroe(nuevoHeroe)
      .then((docRef) => {
        alert('Héroe guardado exitosamente con ID:' + docRef.id);
        this.retornarListado();
      })
      .catch((error) => {
        alert('Error al guardar el héroe:' + error);
      });
  }
  
  retornarListado() {
    this.route.navigate(['/heroes/listaHeroe']);
  }
}
