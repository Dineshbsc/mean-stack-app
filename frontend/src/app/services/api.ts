import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  createOrder(data: any) {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }
  login(data: any) {
  return this.http.post(`${this.baseUrl}/users/login`, data);
}

register(data: any) {
  return this.http.post(`${this.baseUrl}/users/register`, data);
}
getAll() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getById(id: string) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/products/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
