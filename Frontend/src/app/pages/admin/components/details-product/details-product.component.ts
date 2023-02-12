import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details-product',
  templateUrl:'details-product.component.html',
  styles: ['*{ font-family: poppins;}'
  ]
})
export class DetailsProductComponent implements OnInit {

  public products :any
  getId:any

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.getProduct()
  }

  public getProduct(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneProduct(this.getId).subscribe(
      (response) => {
        this.products = response.data;
        console.log(this.products);
      }
    );
  }

}
