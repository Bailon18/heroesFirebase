
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Superheroe } from '../../model/super-heroe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements AfterViewInit , OnInit {

  estadoFiltro:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'CORREO', 'ESTADO', 'ROL','ACCIONES'];
  dataSource = new MatTableDataSource<Superheroe>;

  constructor() {
  }

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

  }

  cargarUsuario(){
    //return this.servicio.getUsuarios();
  }
  
  editarUsuario(fila:any){

  }

  bloquearUsuario(fila:any): void{

  //   swall.fire({
  //     html: `¿Estas seguro de bloquear a <strong>${fila.nombres} ${fila.apellidos}</strong>?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#0275d8',
  //     cancelButtonColor: '#9c9c9c',
  //     confirmButtonText: 'Si, bloquear!',
  //     cancelButtonText:'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       this.servicio.bloquearUsuarioServi(fila).subscribe({
  //         next:(res) => {
  //           this.listarUsuarios();
  //         },
  //         error:(error) => {
  //           console.log("Ocurrio un error")
  //         }
  //       })

  //       swall.fire({
  //         icon:'success',
  //         html:'Usuario bloqueado con exito!'
  //       }
  //       )
  //     } 
  //   })
  // }


  }
}
