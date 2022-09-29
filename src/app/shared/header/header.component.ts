import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/servives/usuario.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario? = new Usuario();

  constructor( private usuarioService: UsuarioService,
                private router: Router ) { 
    this.usuario = usuarioService.usuario;
    
  } 

  buscar(termino:string){

    if(termino.length === 0){
      this.router.navigateByUrl('/dashboard');
      return;
    }

    this.router.navigateByUrl(`dashboard/buscar/${termino}`);

  }

  logout(){
    this.usuarioService.logout();
  }


  ngOnInit(): void {
    customInitFunctions();
  }

}
