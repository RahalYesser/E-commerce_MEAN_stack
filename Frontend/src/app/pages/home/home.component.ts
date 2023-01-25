import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 300, 3: 412, 4: 412 };

@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  
  count = '12';
  sort = 'desc';
  cols = 3 ;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  category : string | undefined 

  constructor(private cartService : CartService){}

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    }

  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product_image: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

}
