import { HeroeService } from '../../services/dragonService';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { listaDeHabilidades, listaDePoderes } from '../../data/data';

@Component({
  selector: 'app-new-page',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent implements OnInit {

  titulo: string = 'Nuevo Personaje';
  tituloBoton: string = 'Guardar Personaje';
  idHeroeEdi!: string;

  public dragonForm: FormGroup = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required]],
    raza: ['', [Validators.required]],
    poder: ['Super fuerza', [Validators.required]],
    transformacion: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    habilidad: ['Kamehameha', [Validators.required]],
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
      this.titulo = 'Editar Personaje';
      this.tituloBoton = 'Actualizar Personaje';

      this.heroeService.buscar(this.idHeroeEdi).subscribe({
        next: (data) => {

          this.dragonForm.setValue({
            id: this.idHeroeEdi,
            nombre: data.nombre,
            raza: data.raza,
            poder: data.poder,
            transformacion: data.transformacion,
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
    if (this.dragonForm.valid) {
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
    const datosActualizados = this.dragonForm.value;
    this.heroeService.actualizar(this.idHeroeEdi, datosActualizados)
      .then(() => {
        alert('Héroe actualizado exitosamente');
        this.retornarListado();
      })
      .catch((error) => {
        alert('Error al actualizar el héroe:' + error);
      });
  }

  crearNuevoHeroe() {
    const nuevoHeroe = this.dragonForm.value;
    this.heroeService.guardar(nuevoHeroe)
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
