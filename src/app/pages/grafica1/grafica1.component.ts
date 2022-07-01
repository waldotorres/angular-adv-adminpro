import { Component } from '@angular/core';

import { ChartData, ChartEvent, Color  } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1:string[] =[ 'Pan', 'Refresco', 'Cebiche' ];

  public doughnutChartData = {
    datasets: [
      { data: [ 50, 20, 5 ],
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']  
      } 
    ]
  };
  //public doughnutChartType: ChartType = 'doughnut';

}
