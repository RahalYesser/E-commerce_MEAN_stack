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


  currentUser: any ;
  count = '12';
  sort = 'Asc';
  cols = 3 ;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  category : string | undefined 

  constructor(private cartService : CartService,private productService:ProductService ,
    public authService: AuthService, private actRoute: ActivatedRoute
    ){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res.msg;
    });
  }

  ngOnInit() {
    this.getProductsByPrice(this.sort)
  }

  onSortChange(newSort: any): void {
    this.sort = newSort;
    this.getProductsByPrice(this.sort);
  }

  public getProductsByPrice(sort:any): void {
    console.log(sort)
    if(sort==='Desc'){
    this.productService.getProductsByPrice(-1).subscribe(
      (response)=>{
        console.log(response)
        this.products=response.data
      }
    )
    }
    if(sort==='Asc'){
      this.productService.getProductsByPrice(1).subscribe(
        (response)=>{
          console.log(response)
          this.products=response.data
        }
      )
      }
  }

  public getProductsByCategories(category:any,sort:any): void {
    this.productService.getProductsByCategories(category,sort).subscribe(
      (response) => {
        this.products = response.data;
        console.log(this.products);
      }
    );
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

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log(this.category)
    this.getProductsByCategories(this.category,this.sort)
    }

  onAddToCart(product:Product):void{
    this.cartService.addToCart({
      product_id:product._id,
      product_image: product.img,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.pcid,
    });
  }

}
