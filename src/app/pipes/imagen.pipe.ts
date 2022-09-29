import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img?: string, tipo?: 'usuarios'|'medicos'|'hospitales'): string {
    
    //console.log(img)

    if( img?.includes('https') )
    {
        return img ;
    }
    if( img ){
        //console.log(`${base_url}/upload/${tipo}/${ img }`)
        return `${base_url}/upload/${tipo}/${ img }`;
    }
    else {
        //console.log(`${base_url}/upload/${tipo}/no-image`)
        return `${base_url}/upload/${tipo}/no-image`;
      }


  }

}
