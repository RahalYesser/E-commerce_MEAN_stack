import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl:'users-list.component.html',
  styles: ['*{ font-family: poppins;}'
  ]
})
export class UsersListComponent implements OnInit {

  users: User [] = [] ;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.getUsers()
  }

  public getUsers(): void {
    this.authService.getUsers().subscribe(
      (response) => {
        this.users = response.data;
        console.log(this.users);
      }
    );
  }


}
