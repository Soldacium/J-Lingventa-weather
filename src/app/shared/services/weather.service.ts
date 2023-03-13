import { ApiResponseData } from './../models/api-response-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiRequestData } from '../models/api-request-data';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getHistoricalMeteoData(
    requestData: ApiRequestData
  ): Observable<ApiResponseData> {
    const date = new Date();
    const dateEndISO = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - requestData.daysBack);
    const dateStartISO = date.toISOString().split('T')[0];

    return this.http
      .get<ApiResponseData>(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${requestData.coordinates.latitude}&longitude=${requestData.coordinates.longitude}&start_date=${dateStartISO}&end_date=${dateEndISO}&hourly=temperature_2m,precipitation&daily=sunrise,sunset,rain_sum&timezone=Europe%2FBerlin`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
