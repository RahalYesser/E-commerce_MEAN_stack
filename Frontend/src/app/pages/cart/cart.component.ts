import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'cart.component.html',
  styles: ['span{ font-family: poppins;}' 
  ]
})
export class CartComponent implements OnInit{
  
  cart: Cart = { items: [] };

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: Array<CartItem> = [];

  constructor(private cartService:CartService){}
  
  ngOnInit():void{
   
    this.cartService.cart.subscribe((_cart : Cart)=> {
      this.cart=_cart;
      this.dataSource = this.cart.items;
    });
  }


  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item : CartItem){
    this.cartService.removeFromCart(item)
  }
  
}
