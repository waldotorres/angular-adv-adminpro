import { Hospital } from "./hospital.model";

interface _MeidicolUser{
    _id:string,
    nombre:string,
    img:string
}

export class Medico{
    
    constructor(
        public _id:string,
        public nombre:string,
        public usuario:_MeidicolUser,
        public img?:string,
        public hospital?: Hospital

    ){

    }

}