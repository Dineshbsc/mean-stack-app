import { Component } from '@angular/core';
import { Weather } from '../weather/weather';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  imports: [Weather, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  username = localStorage.getItem('username');
constructor(private router: Router){}
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
