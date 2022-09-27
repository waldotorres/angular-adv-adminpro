import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servives/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formsubmmited = false;

  public registerForm = this.fb.group({
    nombre:['w1000', [Validators.required, Validators.minLength(2) ] ],
    email:['w1000@mail.com', [Validators.required, Validators.email ]],
    password:['123456', Validators.required ],
    password2:['123456', Validators.required ],
    terminos:[true, Validators.required ],

  }, {
    validators: this.passwordsIguales('password', 'password2')
  }  ) ;


  passwordsIguales(pass1:string , pass2:string){

    return ( formGroup: FormGroup ) =>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }
      else{
        pass2Control?.setErrors({ noEsIgual:true });
      }
    }

  }

  constructor(  private fb: FormBuilder, 
                private usuarioService: UsuarioService,
                private router: Router ) { 

  }

  crearUsuario(){
    this.formsubmmited = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid ){
      return;
    }
    //Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
    .subscribe( resp =>{
      //console.log('Usuario creado: ' , resp);
      this.router.navigateByUrl('/');
    }, (err) => {
      //Si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    } );

  }

  campoNoValido(campo:string): boolean {

     if( this.registerForm.get(campo)?.invalid && this.formsubmmited  ){
      return true;
     }


     return false;

  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formsubmmited;
  }

  contrasenasNoValidas(){
    


    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    

    if( ( pass1 !== pass2 && this.formsubmmited) || ( pass1 ==='' && this.formsubmmited ) ){
      return true;
    }
    return false;
  }

}

