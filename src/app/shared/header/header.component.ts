import { Component, OnInit } from '@angular/core';
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

  constructor( private usuarioService: UsuarioService ) { 
    this.usuario = usuarioService.usuario;
    
  } 

  logout(){
    this.usuarioService.logout();
  }


  ngOnInit(): void {
    customInitFunctions();
  }

}
