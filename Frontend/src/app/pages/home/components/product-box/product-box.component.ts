import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-box',
  templateUrl:'product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent{

  public products : Product[] = []

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined
  @Output() addToCart = new EventEmitter();

  constructor() {}


  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
