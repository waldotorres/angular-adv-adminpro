import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public uid?: string,
        public role?: string,
        public nombre?:string,
        public password?:string,
        public email?:string,
        public google?:boolean,
        public img?:string,
    ){

    }

    get imagenURL(){

        if( this.img?.includes('https') )
        {
            return this.img ;
        }
        if( this.img ){

            //console.log(`${base_url}/upload/usuarios/${ this.img }`);
            
            return `${base_url}/upload/usuarios/${ this.img }`;
        }
        else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}