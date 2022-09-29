import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  get token():string {
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }

  }

  constructor( private http: HttpClient ) { 

  }

  cargarHospitales( ){
    const url= `${ base_url }/hospitales`;

    return this.http.get<{ ok:boolean, hospitales: Hospital[] }>( url ,  this.headers )
                .pipe(
                  map( (resp: { ok:boolean, hospitales: Hospital[] }) => resp.hospitales )
                )
  }

  crearHospital( nombre:string ){
    const url= `${ base_url }/hospitales`;

    return this.http.post( url ,{ nombre } , this.headers );
  }

  actualizarHospital( id:string, nombre:string ){
    const url= `${ base_url }/hospitales/${id}`;

    return this.http.put( url ,{ nombre } , this.headers );
  }

  borrarHospital( id:string  ){
    const url= `${ base_url }/hospitales/${id}`;

    return this.http.delete( url , this.headers );
  }

}
