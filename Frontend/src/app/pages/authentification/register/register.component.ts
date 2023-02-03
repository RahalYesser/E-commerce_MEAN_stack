import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl:'register.component.html',
  styles: ['*{ font-family: poppins; font-size: medium;}' 
  ]
})
export class RegisterComponent  implements OnInit {
  signupForm: UntypedFormGroup;

  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastr : ToastrService
  ) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res: { result: any; }) => {
      if (res.result) {
        this.toastr.success("You can now log in","Your're registred successfully");
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    });
  }

}
