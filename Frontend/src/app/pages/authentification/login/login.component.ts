import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl:'login.component.html',
  styles: ['*{ font-family: poppins; font-size: medium;}' 
  ]
})
export class LoginComponent implements OnInit {
  signinForm: UntypedFormGroup;

  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService,

  ) {
    this.signinForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  ngOnInit() {}

  loginUser() {
    if(this.signinForm.value.email==''){
      this.toastr.error("Email required","ERROR") 
    }
    else 
    if(this.signinForm.value.password==''){
      this.toastr.error("Password required","ERROR") 
    }
    else
    if(this.signinForm.value.email=='admin'&&this.signinForm.value.password=='admin'){
      this.router.navigate(['/admin'])
      this.toastr.success("ADMIN LOGIN")
    }
    else {
      this.authService.signIn(this.signinForm.value)
    }  
  }

}
