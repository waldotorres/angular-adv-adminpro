import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: []
})
export class MedicoComponent implements OnInit {

  public hospitales:Hospital[] = [];
  public medicoForm: FormGroup= new FormGroup('');
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;


  constructor(  private fb:FormBuilder,
                private hospitalService:HospitalService,
                private medicoService:MedicoService,
                private router:Router,
                private activatedRoute:ActivatedRoute ) {

    this.medicoForm = this.fb.group({
      nombre:['', Validators.required],
      hospital:['', Validators.required]
    })

   }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id})=> {

      return this.cargarMedico(id);

    } );

    

    this.cargarHospitales();
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( id=>{
           this.hospitalSeleccionado =  this.hospitales.find( h => h._id === id  );
           //console.log(this.hospitalSeleccionado)
        } )
  }

  cargarMedico(id:string){


    if(id==='nuevo'){
      return;
    }

    this.medicoService.obtenerMedicoPorId( id )
      .pipe(delay(100))
      .subscribe ( (medico:any) => {
        
      if(!medico){
        this.router.navigateByUrl(`/dashboard/medicos`);
      }

      const { nombre, hospital:{_id} }= medico;      
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue( { nombre, hospital:_id } );

      })

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( resp => {
        this.hospitales = resp;
      })
  }

  guardarMedico(){

    if( this.medicoSeleccionado ){
      //Actualizar
      const  data = {
        ... this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico( data )
        .subscribe( resp =>{
          console.log(resp)
          Swal.fire( 'Actualizado', 'Médico actualizado: ' + this.medicoForm.get('nombre')?.value , 'success' );

        } )

    }else{
      //Crear
      
      //console.log(this.medicoForm.value);
      this.medicoService.crearMedico( this.medicoForm.value  )
        .subscribe ( (resp:any)=>{
          //console.log(resp);
  
          Swal.fire( 'Guardado', 'Médico creado: ' + this.medicoForm.get('nombre')?.value , 'success' );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
  
  
        }, err => console.log(err) ) 
    }

  }

}
