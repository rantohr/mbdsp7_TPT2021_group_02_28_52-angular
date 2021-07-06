import { Component, Input, OnInit } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {

  @Input() data

  constructor() {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Filler,
      Legend,
      Title,
      Tooltip
    );
  }

  ngOnInit(): void {
    var ctx: any = document.getElementById("areachartfillstart");
    var areachartfillstart = new Chart(ctx, {
      type: 'line',
      data: {
        // labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        // labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
        datasets: [{
          label: "Mathes per Month",
          fill: 'start',
          backgroundColor: '#ffdc11',
          borderColor: '#ffdc11',
          data: this.data
          // data: [1,10,1,1,1,1,1,1,1,1,1,1]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: false,
        elements: {
          line: {
            tension: 0.0001
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        scales: {
          xAxes: {
            ticks: {
              autoSkip: false,
              maxRotation: 0
            }
          }
        }
      }
    });
  }

}
