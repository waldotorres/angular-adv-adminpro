import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UsuarioService } from 'src/app/servives/usuario.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs?: Subscription;
  public totalUsuarios:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];

  public desde :number = 0;
  public cargando:boolean = true;

  constructor( private usuarioService: UsuarioService,
                private busquedaService: BusquedasService,
                private modalImagenService : ModalImageService ) {



   }

   ngOnDestroy(): void {
     this.imgSubs?.unsubscribe();
   }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSubs =  this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe(img => this.cargarUsuarios());

  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios =total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        //console.log(usuarios)
        
      })

  }

  cambiarPagina(valor:number){
    this.desde +=valor;
    if(this.desde < 0){
      this.desde = 0
    }
    if( this.desde > this.totalUsuarios ){
      this.desde -=valor;
    }
    //
    this.cargarUsuarios();

  }

 

  buscar(termino:string){

    if( termino.length === 0 ){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar( 'usuarios', termino)
      .subscribe( resp => {

        this.usuarios = resp;

      }, err => console.log(err) );
      
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      },  
        err => Swal.fire('Error', err.error.msg, 'error')
        )
  }

  eliminarUsuario( usuario:Usuario ){

    if( usuario.uid === this.usuarioService.uid ){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return; 
    }

    Swal.fire({
      title: 'Borrar usuario',
      text: `¿Esta seguro de borrar a ${  usuario.nombre }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe( resp =>{

              Swal.fire(
                'Eliminado!',
                'Usuario eliminado.',
                'success'
              )

              this.cargarUsuarios();

            }, err => console.log(err) )
      }
    })

  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal( 'usuarios', usuario.uid!, usuario.img);
     
    
  }

}
