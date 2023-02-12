import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-history',
  templateUrl:'order-history.component.html',
  styles: ['*{ font-family: poppins;}'
  ]
})
export class OrderHistoryComponent {

  @Input() orders:any

  @Input() ordersLength:any

}
