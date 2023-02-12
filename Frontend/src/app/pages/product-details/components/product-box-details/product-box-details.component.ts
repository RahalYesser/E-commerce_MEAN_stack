import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box-details',
  templateUrl:'product-box-details.component.html',
  styles: [
  ]
})
export class ProductBoxDetailsComponent {
 
  @Input() product: Product | undefined
  @Output() addToCart = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
