import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) { }

  getTotal(items: CartItem[]): number {
    return items.
    map((items => items.price*items.quantity))
    .reduce((prev,current)=> prev+current, 0)
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
      this._snackBar.open('Item added to cart.', 'Ok', { duration: 2000 });
      console.log(this.cart.value)
    }

    this.cart.next({ items });
    
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if(update){
      this.cart.next({ items: filteredItems });
      this._snackBar.open('Item removed from cart.', 'Ok', {
        duration: 2000,
      }); 
    }

    return filteredItems;
  }


  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false)
    }

    this.cart.next({ items: filteredItems });
   
  }
  
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 2000,
    });
  }

  
}
