import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl:'orders.component.html',
  styles: [ '*{ font-family: poppins;}'
  ]
})
export class OrdersComponent implements OnInit{

  orders:any []=[];
  
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getOrders()
  }

  public getOrders(): void {
    this.orderService.getOrders().subscribe(
      (response) => {
        this.orders = response.data;    
        console.log(this.orders);
      }
    );
  }
}
