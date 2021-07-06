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
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

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

    var ctx: any = document.getElementById("linechartinterpolation");
    var linechartinterpolation = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["15", "25", "35"],
        datasets: [{
          label: "Female",
          fill: false,
          backgroundColor: '#ffdc11',
          borderColor: '#ffdc11',
          data: [0, this.data.femaleU25, this.data.female],
          cubicInterpolationMode: 'monotone'
        }, {
          label: "Male",
          fill: false,
          backgroundColor: '#fb9678',
          borderColor: '#fb9678',
          data: [0, this.data.maleU25, this.data.male],

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
              minRotation: 0,
              maxRotation: 100,
            }
          }
        }
      }
    });
  }

}
