import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl:'profile.component.html',
  styles: ['*{ font-family: poppins; font-size: large;}']
})
export class ProfileComponent implements OnInit {
  cart: Cart = { items: [] };
  
  orders:any []=[];
 
  myorders:Array<any>=[];

  orderNumber=0;
  
  info=1;

  currentUser: any;

  constructor(private cartService:CartService,private actRoute: ActivatedRoute,
    private authService:AuthService,private orderService:OrderService,private toastr:ToastrService){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart : Cart)=> {
      this.cart=_cart;
      
    });
    this.getOrders()
  }

  public getOrders(): void {
    this.orderService.getOrders().subscribe(
      (response) => {
        this.orders = response.data;  
        for(let i=0;i<this.orders.length;i++){
          if(this.currentUser._id===this.orders[i].userId){
            this.myorders[i]=this.orders[i]
          }
        } 
        for(let i=0;i<this.myorders.length;i++){
          if(this.myorders[i]){
            this.orderNumber+=1;
          }
        }
        console.log(this.orderNumber)


      }
    );
  }

  logout() {
    this.authService.doLogout();
    this.toastr.error("You're logged out","logout",{
      positionClass: 'toast-bottom-right' }
   )
  }


  onClickProfileInfoButton():void{
    this.info=1
  }

  onClickOrderHistoryButton():void{
    this.info=0
  }


}
