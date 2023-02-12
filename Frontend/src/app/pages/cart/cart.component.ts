import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'cart.component.html',
  styles: ['span{ font-family: poppins;}' 
  ]
})
export class CartComponent implements OnInit{
  
  cart: Cart = { items: [] };

  currentUser: any ;

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: Array<CartItem> = [];

  constructor(private cartService:CartService,private actRoute: ActivatedRoute,public router: Router,
    private authService:AuthService){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }
  
  ngOnInit():void{
   
    this.cartService.cart.subscribe((_cart : Cart)=> {
      this.cart=_cart;
      this.dataSource = this.cart.items;
      console.log(this.cart.items)
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

  onProceedOrder(){
    if (this.authService.isLoggedIn !== true) {
      window.alert('PLEASE LOGIN FIRST');
      this.router.navigate(['login']);
    }
    else 
    this.router.navigate(['/order/',this.currentUser._id]) 
  }
  
}
