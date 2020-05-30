import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  condition = false;
    // tslint:disable-next-line: no-inferrable-types
  isLoginError: boolean = false;
  constructor(private userService: UserService, private router: Router) { }
  userpattern = '^[a-z0-9_-]{3,15}$';
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,}';


  ngOnInit(): void {
  }
  OnSubmit(username, password) {
    this.condition = true;
    this.userService.loginUser(username, password).subscribe((data: any) => {
     // localStorage.setItem('token', data.data.token);
      console.log(data);
      if (data.response === 200 ) {
        localStorage.setItem('token' , data.data.token );
      }
   },
   (err: HttpErrorResponse) => {
     this.isLoginError = true;
   });
 }

}


