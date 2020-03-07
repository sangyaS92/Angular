import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions,Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { Data } from '../Data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  lineChartData: ChartDataSets[];
  chart = [];
  
  /*lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];*/

 // lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
 lineChartLabels: Label[] ;
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  url = 'http://localhost:4000/results';
  month = [];
  price = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      res.forEach(y => {
        this.month.push(y.month);
        this.price.push(y.price);
      });
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.price,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }


}
