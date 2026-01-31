
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-weather',
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
// Define weather as an Observable instead of a static object
  weather$!: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiKey = 'cec29b06a4d0b62c3082d41aeaed2f9c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=11.0934&lon=79.6438&appid=${apiKey}`;

    // Use pipe and map to format the data before it reaches the UI
    this.weather$ = this.http.get<any>(url).pipe(
      map(res => ({
        city: res.name,
        temp: Math.round(res.main.temp - 273.15),
        condition: res.weather[0].main
      }))
    );
  }
}
