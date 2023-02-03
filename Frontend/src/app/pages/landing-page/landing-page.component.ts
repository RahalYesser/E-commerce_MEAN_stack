import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-landing-page',
  templateUrl:'landing-page.component.html',
  styles: ['*{font-family: poppins;}'
  ]
})
export class LandingPageComponent implements OnInit {

  public products : Product[] = []

  cart: Cart = { items: [] };
  cols = 4 ;
  constructor(private cartService : CartService,private productService:ProductService ){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
  
  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.data;
        console.log(this.products);
      }
    );
  }

  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product_image: product.img,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.pcid,
    });
  }
}
