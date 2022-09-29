import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot  } from '@angular/router';
import { UsuarioService } from '../servives/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(  private usuarioService:UsuarioService,
                private router:Router ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if( this.usuarioService.role === 'ADMIN_ROLE'){
        return true;
      }

      this.router.navigateByUrl('/dashboard');
      return false;

  }
  
}
