import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] =[];
  public cargando: boolean = true;
  public imgSubs?:Subscription;


  constructor( private hospitalService:HospitalService,
                private modalImagenService: ModalImageService,
                private busquedaService: BusquedasService ) {

  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  
  ngOnInit(): void {

    this.cargarHospitales();
      
    this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe(img => this.cargarHospitales());    


  }

  buscar(termino:string){

    if( termino.length === 0 ){
      this.cargarHospitales();
      return;
    }

    this.busquedaService.buscar( 'hospitales', termino)
      .subscribe( resp => {

        this.hospitales = resp as Hospital[];

      }, err => console.log(err) );
      
  }


  cargarHospitales(){

    this.cargando = true;


    this.hospitalService.cargarHospitales()
      .subscribe( resp => {
        
        this.hospitales = resp;
        this.cargando = false;
      } );


  }
  

  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
      .subscribe( resp =>  { 
        Swal.fire( 'Guardado', 'Se guardó con éxito!', 'success' );
       }, (err) =>{
        Swal.fire( 'Error', err.error.msg, 'error' );
       } )
  }

  borrarHospital(hospital:Hospital){
    this.hospitalService.borrarHospital( hospital._id )
      .subscribe( resp =>  { 
        this.cargarHospitales();
        Swal.fire( 'Borrado', 'Se eliminó con éxito!', 'success' );
        
       }, (err) =>{
        Swal.fire( 'Error', err.error.msg, 'error' );
        
       } )
  }


  async abrirSweetAlert(){

    const {value =''} = await Swal.fire<string>({
      input: 'text',
      showCancelButton: true,
      title:'Crear Hospital',
      inputPlaceholder: 'Nombre del hospital'
    })
    
     if(value ){
      if( value.trim().length > 0 ){
        this.hospitalService.crearHospital(value)
          .subscribe( (resp:any)=> {
            this.hospitales.push( resp.hospital );
          })
      }
     }

  }


  abrirModal(hospital:Hospital){

    
    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img);
  }

}
