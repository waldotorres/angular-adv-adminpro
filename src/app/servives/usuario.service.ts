import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { RegisterForm } from '../interfaces/interface-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url ;
declare const google: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  public usuario?: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone:NgZone
               ) {

   }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario?.uid!;
  }

  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('waldotorres.07@gmail.com', ()=>{
      
      this.ngZone.run( ()=>{
        this.router.navigateByUrl('/login');
      } )

    } )
  }

  validarToken(): Observable<boolean> {
    //const token = localStorage.getItem('token') ||'';
    return this.http.get(`${base_url}/login/renew`, {
                headers:{
                  'x-token': this.token
                }
              }).pipe(
                map(
                  (resp:any) =>{
                    const { email, google, nombre, role, img, uid } = resp.usuario;
                    this.usuario = new Usuario(  uid, role, nombre, '', email, google, img);
                    localStorage.setItem('token', resp.token  );
                  
                    return true;

                  }
                 )
                 ,
                 catchError ( err => of( false ) )
              );

  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post( `${base_url}/usuarios` , formData )
            .pipe( 
              tap( (resp:any) => {
                localStorage.setItem('token', resp.token  );
              }) 
            )

  }

  actualizarPerfil ( data: {email:string, nombre:string, role:string } ){
    data = { ...data, role: this.usuario?.role! };

    return this.http.put( `${base_url}/usuarios/${this.uid}` , data , 
                  {
                    headers:{
                      'x-token': this.token
                    }
                  }
      );
  }

  loginUsuario( formData: LoginForm ){
    
    return this.http.post( `${base_url}/login` , formData )
            .pipe( 
                    tap( (resp:any) => {
                      localStorage.setItem('token', resp.token  );
                    }) 
                  )

  }

  loginGoogle( token:string ){
    return this.http.post(`${base_url}/login/google`, { token })
            .pipe( 
              tap (
                (resp:any) => {
                  localStorage.setItem('token', resp.token  );
                }
              )
             )
  }

}
