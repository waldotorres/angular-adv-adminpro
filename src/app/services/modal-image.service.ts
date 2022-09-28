import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

private _ocultarModal: Boolean = true;

get ocultarModal(){
  return this._ocultarModal;
}
public tipo?: 'usuarios'|'medicos'|'hospitales';
public id: string='';
public img?: string='no-img';
public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  abrirModal( tipo : 'usuarios'|'medicos'|'hospitales',
              id:string,
              img?:string )
  {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    
    //
    if(img?.includes('https')){
      this.img = img;
    } else {
      this.img = `${base_url }/upload/${tipo}/${img}`;
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  

}



