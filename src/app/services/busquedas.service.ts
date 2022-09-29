import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url:string =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados:any[] ): Usuario[]{
    return resultados.map( user => new Usuario( user.uid, user.role, user.nombre, '',user.email, user.google, user.img ) );
  }
  private transformarHospitales( resultados:any[] ): Hospital[]{
    return resultados;
  }

  private transformarMedicos( resultados:any[] ): Medico[]{
    return resultados;
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales',
          termino: string = '' ){

    const url= `${ base_url }/todo/coleccion/${tipo}/${ termino }`;
    
    return this.http.get<any[]>( url ,  this.headers )
            .pipe(
              map( (resp:any)=> {
                
                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultado);

                  case 'hospitales':
                    return this.transformarHospitales(resp.resultado);
                  case 'medicos':
                    return this.transformarMedicos(resp.resultado);

                  default:
                    return[];
                }

              } )
              
              
            )
            

  }


}
