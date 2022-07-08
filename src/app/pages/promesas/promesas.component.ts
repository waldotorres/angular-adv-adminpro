import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    this.getUsuarios()
      .then( usuarios => console.log(usuarios)  )  ;


    // const promesa = new Promise( (resolve, reject)=>{
    //   if (false) {
        
    //     resolve('hola mundo promesa');
    //   } else {
    //     reject('algo produjo un error')
    //   }
    // } );

    // promesa.then( (msg)=>{
    //   console.log(msg)  
    // } ).catch( err => console.log(err))

    // console.log('saludos')


  }


  getUsuarios(){

    return new Promise( (resolve, reject) =>{

    fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data) )

    }); 

  }

}
