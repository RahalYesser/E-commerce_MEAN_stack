import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl:'products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {
  public products : Product[] = []

  constructor(private productService:ProductService,private toastr:ToastrService){}

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
  
  public onDeleteProduct(product: any): void {
    console.log(product)
    this.productService.deleteProduct(product).subscribe(
      (response: void) => {
        console.log(response);
        this.toastr.error("Product deleted","")
      },
    );
  }
}
