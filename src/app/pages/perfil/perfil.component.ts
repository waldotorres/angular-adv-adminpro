import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/servives/usuario.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html' 
})
export class PerfilComponent implements OnInit {

  public perfilForm:any = FormGroup;
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) { 

    this.usuario = usuarioService.usuario;

    this.perfilForm = this.fb.group({
      nombre:[ this.usuario?.nombre , Validators.required],
      email:[ this.usuario?.email , [Validators.required, Validators.email]]
    });

  }

  cambiarImagen( target:any ){
    this.imagenSubir = target.files[0];

    if(!target.files[0] ){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir!);
    reader.onloadend = ()=>{
      this.imgTemp = reader.result;
      
    }

    return;



  }

  subirImagen(){
    this.fileUploadService.actualizarFoto( this.imagenSubir!, "usuarios", this.usuario?.uid! )
      .then( img => {
                      this.usuario!.img = img || '';
                      Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
                    } )
      .catch( err => {
        Swal.fire('Error', err.error.msg, 'error');
      } )
  }
  actualizarPerfil(){
    //console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {
          console.log(resp);
          const { nombre, email } = this.perfilForm.value;
          this.usuario!.nombre = nombre ;
          this.usuario!.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');

        },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
         } )
      
  }

  ngOnInit(): void {


  }

}
