import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl:'product-details.component.html',
  styles: ['*{ font-family: poppins; font-size: medium;}'
  ]
})
export class ProductDetailsComponent implements OnInit {
 
  cart: Cart = { items: [] }
  currentUser: any ;
  getId:any
  public products :any
  @Output() addToCart = new EventEmitter();


  constructor(private cartService : CartService,private productService:ProductService,
    private actRoute: ActivatedRoute,private authService:AuthService){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    let id = this.actRoute.snapshot.paramMap.get('uid');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }

  ngOnInit(): void {
      this.getProduct()
  }

  public getProduct(): void {
    this.getId = this.actRoute.snapshot.paramMap.get('pid');
    this.productService.getOneProduct(this.getId).subscribe(
      (response) => {
        this.products = response.data;
        console.log(this.products);
      }
    );
  }

  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product_image: product.img,
      product_id:product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.pcid,
    });
  }
  

}
