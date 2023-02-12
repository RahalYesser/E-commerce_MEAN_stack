import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl:'order.component.html',
  styles: ['*{ font-family: poppins; font-size: medium;}'
  ]
})
export class OrderComponent implements OnInit {
  dataSource: Array<CartItem> = [];

  cart: Cart = { items: [] };

  @Input() user: User | undefined

  orderForm!: FormGroup;

 

  constructor(private cartService:CartService,private actRoute: ActivatedRoute ,public router: Router,
    private authService:AuthService,private fb: FormBuilder,private orderService:OrderService,
    private toastr :ToastrService ){
      this.orderForm=new FormGroup({
         fname:new FormControl(),
         lname:new FormControl(),
         phone:new FormControl(),
         email:new FormControl(),
         city:new FormControl(),
         street:new FormControl(),
         country:new FormControl(),
         zipcode:new FormControl(),

      })
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.user=res.msg
      this.orderForm=this.fb.group({
        fname:this.user?.username,
        lname:this.orderForm.value.lname,
        name:this.orderForm.value.name,
        phone:this.orderForm.value.lname,
        email:this.user?.email,
        city:this.orderForm.value.city,
        country:this.orderForm.value.country,
        zipcode:this.orderForm.value.zipcode,
        street:this.orderForm.value.street,        
      })

    });

  }

  ngOnInit():void{
   
    this.cartService.cart.subscribe((_cart : Cart)=> {
      this.cart=_cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  public onConfirmOrder(): void {
    document.getElementById('order-product-form')?.click();

    if(this.orderForm.value.lname===null){
      this.toastr.error("Please write your Last Name","Failed",{
        positionClass: 'toast-bottom-right' 
     })
    }
    else 
    if(this.orderForm.value.fname===null){
      this.toastr.error("Please write your First Name","Failed",{
        positionClass: 'toast-bottom-right' 
     })
    }
    else
    if(this.orderForm.value.city===null){
      this.toastr.error("Please write your city","Failed",{
        positionClass: 'toast-bottom-right' 
     })
    }
    else
    if(this.orderForm.value.country===null){
      this.toastr.error("Please write your country or region","Failed",{
        positionClass: 'toast-bottom-right' 
     })
    }
    else
    if(this.orderForm.value.zipcode===null){
      this.toastr.error("Please write your zipcode","Failed",{
        positionClass: 'toast-bottom-right' 
     })
    }
    else
    if(this.orderForm.value.street===null){
     this.toastr.error("Please write your street","Failed",{
      positionClass: 'toast-bottom-right' 
   })
    }
    else
    if(this.orderForm.value.phone===null){
      this.toastr.error("Please write your phone number","Failed",{
      positionClass: 'toast-bottom-right' 
   })
    }
    else
    if(this.orderForm.value.email===null){
      this.toastr.error("Please write your email adress","Failed",{
      positionClass: 'toast-bottom-right' 
   })
    }
    else {
      var orderdata= {
        userId:this.user?._id,
        fname:this.orderForm.value.fname,
        lname:this.orderForm.value.lname,
        email:this.orderForm.value.email,
        phone:this.orderForm.value.phone,
        amount:this.getTotal(this.cart.items),
        adress:{
          city:this.orderForm.value.city,
          country:this.orderForm.value.country,
          street:this.orderForm.value.street,
          zipcode:this.orderForm.value.zipcode,
        },
        products:this.cart.items
       }
   
     this.orderService.ConfirmOrder(orderdata).subscribe(
      (response) => {
        console.log(response);
        if(response.status=="success"){
          this.toastr.success("Check your profile to see orders details","SUCCESS")
          this.router.navigate(['home/'+this.user?._id])
        }
        else {
          this.toastr.error("Cannot place order","FAILED")
        }
    
      }
    );
  
    }
    

  
      
  }

}
