import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product ={
    id: 1,
    sku: 6516484653,
    title: 'hp',
    price: 150,
    category: 'PC',
    description: 'zaefsdfazef a efazef azef azef azef',
    image: 'https://via.placeholder.com/150',
  };
  @Output() addToCart = new EventEmitter();

  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
