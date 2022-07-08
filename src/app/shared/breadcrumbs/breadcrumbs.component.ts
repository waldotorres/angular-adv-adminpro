import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo:string ='';
  public tituloSubs!:Subscription;
  constructor( private router:Router ) { 
    
    this.tituloSubs =  this.getArgumentosRuta()
                        .subscribe( ({titulo}) => {
                          this.titulo = titulo
                          document.title = `AdminPro - ${ this.titulo }`
                        } );

    
    
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }

  ngOnInit(): void {

  }

  getArgumentosRuta(){

    return this.router.events
      .pipe( 
        filter<any>( event => event instanceof ActivationEnd ),
        // filter( (event) => {
        //   if(event instanceof ActivationEnd){

        //   }
        // } )

        filter<any>( (event:ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event:ActivationEnd) => event.snapshot.data )
       )
      

  }



}
