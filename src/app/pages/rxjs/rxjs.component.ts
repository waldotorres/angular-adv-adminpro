import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription  } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy  {

  public intervalSubs!: Subscription;

  constructor() { 

    
    // this.retornaObservable()
    // .pipe( retry(1) )
    // .subscribe( (valor)=> console.log('subs:', valor),
    //                 err => console.warn('Error:', err),
    //                 ()=> console.info('Obs terminado')  );

    this.intervalSubs = this.retornaIntervalo().subscribe(  console.log  );
    

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {



  }

  retornaIntervalo():Observable<number>{
    return interval(200)
                      .pipe(
                          take(10),
                          map(valor => valor +1 ),
                          filter( valor => (valor%2===0?true:false) ),
                      );    
  }

  retornaObservable():Observable<number> {
    let i =-1;
    
    const obs$ = new Observable<number>(( observer )=>{
      
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if (i===4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i===2) {
          console.log('i=2 .... Error');
          observer.error('Error: i llego al valor de 2');

        }
        

      },1000)

    });

    return obs$;

  }

}
