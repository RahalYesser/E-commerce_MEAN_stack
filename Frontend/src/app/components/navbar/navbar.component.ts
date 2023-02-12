import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  templateUrl:'navbar.component.html',
  styles: [ 'nav { font-family: poppins; font-size: medium;}' ]
})
export class NavbarComponent {
  constructor(public authService: AuthService, 
    private toastr: ToastrService ,
    ) {}

  logout() {
    this.authService.doLogout();
    this.toastr.error("You're logged out","logout",{
      positionClass: 'toast-bottom-right' }
   )
  }
}
