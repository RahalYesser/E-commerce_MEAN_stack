import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    this.authService.signIn(this.signinForm.value);
    this.toastr.success("Log in","You're logged in your account")
    
  }

}
