import { Component, OnInit } from '@angular/core';
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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

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
    var ctx: any = document.getElementById("linechartinterpolation");
    var linechartinterpolation = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["0", "1", "2"],
        datasets: [{
          label: "Cubic interpolation",
          fill: false,
          backgroundColor: '#ffdc11',
          borderColor: '#ffdc11',
          data: [0, 15, 17, 30, 0, 12, -30, 5, 30, 8, 30, 12, 30],
          cubicInterpolationMode: 'monotone'
        }, {
          label: "Cubic interpolation",
          fill: false,
          backgroundColor: '#fb9678',
          borderColor: '#fb9678',
          data: [-25, 30, 12, -30, 12, 30, 8, -30, 9, 30, -30, -12, -30]

        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: {
            display: true,
          },
          yAxes: {
            display: true,
            ticks: {
              minRotation: -30,
              maxRotation: 30,
            }
          }
        }
      }
    });
  }

}
