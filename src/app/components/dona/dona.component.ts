import { Component, Input, Output  } from '@angular/core';
import { ChartData, ChartEvent, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {


  
  @Input() title:string='Sin título';
  

  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']  
      } 
    ]
  };

}
