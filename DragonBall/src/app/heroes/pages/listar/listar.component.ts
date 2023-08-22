
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DragonBall } from '../../model/dragon-ball';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeroeService } from '../../services/dragonService';
import { listaDeHabilidades } from '../../data/data';
@Component({
  selector: 'app-list-page',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements AfterViewInit , OnInit {

  estadoFiltro:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'RAZA', 'PODER', 'TRANSFORMACION' ,'HABILIDAD','ACCIONES'];
  dataSource = new MatTableDataSource<DragonBall>;
  habilidades = listaDeHabilidades;

  constructor(
    private router: Router,
    private servicio: HeroeService
    ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarUsuarios(){
    return this.servicio.listar().subscribe(
      {next: res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        },
        error: error => {
          alert("Ocurrio un error en la carga: " + error)
        }
      }
    )
  }

  mostrarVentanaNuevoHeroe(){
    this.router.navigate(['/heroes/nuevoHeroe']);
  }


  editarHeroe(fila:any){
    this.router.navigate(['/heroes/editHeroe/'+fila.id]);
  }


  eliminarHeroe(fila:any) {

    if (fila.id) {
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este personaje?');
      if (confirmacion) {
        this.servicio.eliminar(fila.id)
          .then(() => {
            alert('Héroe eliminado exitosamente');
            this.listarUsuarios();
          })
          .catch((error) => {
            alert('Error al eliminar el héroe:' + error);
          });
      }
    } else {
      alert('No se puede eliminar un héroe sin ID');
    }
  }

}
