import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl:'edit-product.component.html',
  styles: ['*{ font-family: poppins;}'
  ]
})
export class EditProductComponent implements OnInit {
  getId :any;
  editForm!: FormGroup;
  constructor (private productService : ProductService, private toastr :ToastrService,
    private activatedRoute: ActivatedRoute,  private fb: FormBuilder ) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.editForm=new FormGroup({
        pcid:new FormControl(),
        name:new FormControl(),
        img:new FormControl(),
        categories:new FormControl(),
        stock:new FormControl(),
        price:new FormControl(),
        size:new FormControl(),
        color:new FormControl(),
        desc:new FormControl(),
      })
      this.productService.getOneProduct(this.getId).subscribe(res => {
        this.editForm=this.fb.group({
          pcid:res.data.pcid,
          name:res.data.name,
          img:res.data.img,
          categories:res.data.categories,
          price:res.data.price,
          stock:res.data.stock,
          size:res.data.size,
          color:res.data.color,
          desc:res.data.desc
        })
      }); 
      
  }

  ngOnInit(){
  }

  public onUpdateProduct(): void {
    this.productService.updateProduct(this.getId,this.editForm.value).subscribe(
      (response) => {
        console.log(response);
        if(response.status==="success"){
          this.toastr.success("Update Product successfully")
        }
      }
    );
  }

  public onInitForm(){
    this.editForm.reset();
  }

}
