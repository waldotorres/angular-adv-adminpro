
import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/servives/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare const google:any;

const base_url = environment.base_url;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'] 
})


export class LoginComponent implements AfterViewInit {
  
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  
  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit(){

    google.accounts.id.initialize({
      client_id: "299830542804-gp6rpomgcnun9l7q3s9hosm8vbuad7go.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse( response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse(response:any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
    .subscribe ( resp=>{

      console.log({login: resp});
      
      this.ngZone.run ( ()=>
        {this.router.navigateByUrl('/');}
       )

    }, (err) =>{
        Swal.fire('Error', err.error.msg, 'error')
    })
  }


  public formsubmmited = false;
  

  public loginForm :FormGroup;

  constructor( private router:Router, 
                private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private ngZone:NgZone  ) { 
    
                this.loginForm = this.fb.group({
                  email:[ localStorage.getItem('email')||'', [Validators.required, Validators.email ]],
                  password:['', Validators.required ],
                  remember:[false]
                }) ;

  }
  
  login(){
    console.log(this.loginForm.value);

    this.usuarioService.loginUsuario( this.loginForm.value )
    .subscribe( (resp) =>{

      console.log(resp);

      if( this.loginForm.get('remember')?.value ){
        localStorage.setItem('email', this.loginForm.get('email')?.value )
      }
      else{
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/');

    }, (err) => Swal.fire( 'Error', err.error.msg, 'error' ) )

    
  }
}
