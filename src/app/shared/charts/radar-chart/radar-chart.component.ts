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
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

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
    const realData = [this.data.a, this.data.b, this.data.c, this.data.d, this.data.e]
    
    var ctx: any = document.getElementById("radarChart");
    var radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['-18', '19 - 22', '23 - 26', '27 - 30', '+30'],
        datasets: [{
          label: 'Gamblers by ages',
          data: realData
        }]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 10,
            suggestedMax: 30
          }
        }
      },
    });
  }

}
