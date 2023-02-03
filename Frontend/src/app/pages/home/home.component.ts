import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 300, 3: 412, 4: 412 };

@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  public products : Product[] = []

  cart: Cart = { items: [] };

  currentUser: any = {};
  count = '12';
  sort = 'desc';
  cols = 3 ;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  category : string | undefined 

  constructor(private cartService : CartService,private productService:ProductService ,public authService: AuthService){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    // private actRoute: ActivatedRoute
    // let id = this.actRoute.snapshot.paramMap.get('id');
    // this.authService.getUserProfile(id).subscribe((res) => {
    //   this.currentUser = res.msg;
    // });
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
      product_image: product.img,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.pcid,
    });
  }

}
