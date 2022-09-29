import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean = true;
  public medicos:Medico[] = [];
  public imgSubs?:Subscription;
  constructor( private medicosService:MedicoService,
                private modalImagenService:ModalImageService,
                private busquedaService:BusquedasService) {


   }

   ngOnDestroy(): void {
     this.imgSubs?.unsubscribe();
   }

  cargarMedicos(){
    this.medicosService.cargarMedicos()
    .subscribe( resp => {
          //console.log(resp)
          this.medicos = resp;
          this.cargando = false;
        } )

    
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe(img => this.cargarMedicos());    


  }

  borrarMedico(medico:Medico){
     
    Swal.fire({
      title: 'Borrar médico',
      text: `¿Esta seguro de borrar al méedico ${  medico.nombre }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.medicosService.borrarMedico(medico._id)
            .subscribe( resp =>{

              Swal.fire(
                'Eliminado!',
                'Médico eliminado.',
                'success'
              )

              this.cargarMedicos();

            }, err => console.log(err) )
      }
    })


  }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img);
  }

  buscar(termino:string){

    if( termino.length === 0 ){
      this.cargarMedicos();
      return;
    }

    this.busquedaService.buscar( 'medicos', termino)
      .subscribe( resp => {

        this.medicos = resp as Medico[];

      }, err => console.log(err) );
      
  }

}
