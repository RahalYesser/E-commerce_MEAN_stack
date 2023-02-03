import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl:'add-product.component.html',
  styles: [
  ]
})
export class AddProductComponent {
  

  constructor (private productService : ProductService, private toastr :ToastrService) {}

  public onAddProduct(addForm: NgForm): void {
    document.getElementById('add-product-form')?.click();
     
    this.productService.addProduct(addForm.value).subscribe(

      (response) => {
        console.log(response);
        if(response.status=="success"){
          this.toastr.success("Add product successfully","")
          addForm.reset()
        }
        else{
          if(addForm.value.pcid===""){
          this.toastr.error("please fill in the PCID field",response.status)
          }
          else {
            if(addForm.value.name===""){
            this.toastr.error("please fill in the Name field",response.status)
            }
            else
            if(addForm.value.categories===""){
              this.toastr.error("please fill in the Categories field",response.status)
              }
              else
              if(addForm.value.stock===""){
                this.toastr.error("please fill in the Stock field",response.status)
                }
                else
                if(addForm.value.price===""){
                  this.toastr.error("please fill in the Price field",response.status)
                  }
                  else
                  if(addForm.value.desc===""){
                   this.toastr.error("please fill in the Description field",response.status)
                  }
                   else
                   if(addForm.value.img===""){
                    this.toastr.error("please fill in the ImageUrl field",response.status)
                   }
          }
        }
        
      }
    
    );
  }

  public onInitForm(addForm:NgForm){
    addForm.reset();
  }

}
