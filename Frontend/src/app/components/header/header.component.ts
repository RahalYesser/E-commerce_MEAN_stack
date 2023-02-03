import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styles: ['header,span{font-family: poppins;}' ]
})

export class HeaderComponent {

  isAdmin=0

  currentUser: any = {};

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(private cartService:CartService,public authService: AuthService)
    // ,private actRoute: ActivatedRoute
  {
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe((res: { msg: any; }) => {
    //   console.log(res.msg)
    //   this.currentUser = res.msg;
    // });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

}
