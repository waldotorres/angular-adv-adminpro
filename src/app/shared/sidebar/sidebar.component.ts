import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/servives/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario? = new Usuario();
  constructor( private sidebarService:SidebarService, 
              private usuarioService:UsuarioService ) { 

    this.usuario = usuarioService.usuario;

    this.menuItems = sidebarService.menu;  

  }

  ngOnInit(): void {
  }

}
