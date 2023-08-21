
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Superheroe } from '../../model/super-heroe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeroeService } from '../../services/heroes.service';
import { listaDeHabilidades } from '../../data/data';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements AfterViewInit , OnInit {

  estadoFiltro:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'ALIAS', 'PODER', 'HABILIDAD','ACCIONES'];
  dataSource = new MatTableDataSource<Superheroe>;
  habilidades = listaDeHabilidades;

  constructor(
    private router: Router,
    private heroesServicios: HeroeService
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
    return this.heroesServicios.listarHeroes().subscribe(
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
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este héroe?');
      if (confirmacion) {
        this.heroesServicios.eliminarHeroe(fila.id)
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
