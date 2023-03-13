import { ApiRequestData } from './shared/models/api-request-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from './shared/services/weather.service';
import { citiesCoordinates } from './shared/constants/city-coordinates';
import { ApiResponseData } from './shared/models/api-response-data.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Lingventa-weather';

  weatherData!: ApiResponseData;
  weatherOptionsForm: FormGroup = this.fb.group({
    city: 'warsaw',
    daysBack: 1,
    displayType: 'cards',
  });
  ctx!: HTMLCanvasElement;
  weatherChart!: Chart;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.ctx = document.getElementById('weatherChart') as HTMLCanvasElement;
    this.weatherChart = new Chart(this.ctx, {
      data: {
        datasets: [
          {
            type: 'bar',
            label: 'Percipitation',
            data: [],
          },
          {
            type: 'line',
            label: 'Temperatures',
            data: [],
            backgroundColor: 'rgb(128, 0, 187)',
          },
        ],
        labels: [],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Hourly temperature & percipitation',
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            beginAtZero: false,
          },
        },
      },
    });
  }

  setChartData(
    dates: Array<string>,
    temperatures: Array<number>,
    percipitation: Array<number>
  ) {
    this.weatherChart.data.datasets = [
      {
        type: 'bar',
        label: 'Percipitation',
        data: percipitation,
        backgroundColor: 'rgb(128, 0, 120)',
      },
      {
        type: 'line',
        label: 'Temperatures',
        data: temperatures,
        backgroundColor: 'rgb(128, 0, 187)',
      },
    ];
    this.weatherChart.data.labels = dates.map((date, i) => date.split('T')[1]);
    this.weatherChart.update();
  }

  submit(): void {
    const requestData: ApiRequestData = {
      coordinates: citiesCoordinates[this.weatherOptionsForm.value.city],
      daysBack: this.weatherOptionsForm.value.daysBack,
    };
    this.weatherService
      .getHistoricalMeteoData(requestData)
      .subscribe((data) => {
        this.weatherData = data;
        this.setChartData(
          data.hourly.time,
          data.hourly.temperature_2m,
          data.hourly.precipitation
        );
      });
  }
}
