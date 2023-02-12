import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private REST_API : String ="http://localhost:5000/order";

  constructor(private httpClient: HttpClient) { }

  // Confirm
  ConfirmOrder(order:any): Observable<any> {
    let API_URL = `${this.REST_API}/confirm`;
    return this.httpClient.post<Order>(API_URL, order)
  }

  // Orders list
  getOrders():Observable<any> {
    return this.httpClient.get<any>(`${this.REST_API}/list`);
  }
}
