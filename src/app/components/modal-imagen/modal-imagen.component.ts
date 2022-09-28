import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: []
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir?: File;
  public imgTemp: any = '';

  constructor( public modalImagenService:ModalImageService,
                public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
    
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo= this.modalImagenService.tipo;


    this.fileUploadService.actualizarFoto( this.imagenSubir!, tipo!, id )
      .then( img => {
                      
                      Swal.fire('Guardado', 'Imagen actualizada correctamente', 'success');
                      this.modalImagenService.nuevaImagen.emit(img);
                      this.cerrarModal();
                    } )
      .catch( err => {
        Swal.fire('Error', err.error.msg, 'error');
      } )
  }

}
