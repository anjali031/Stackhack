import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import {User} from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  condition = false;
  user: User;
  userpattern = '^[a-z0-9_-]{3,15}$';
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}';
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    };
  }

  jeweler() {
    this.router.navigate(['/login']);
  }

  check() {
    // tslint:disable-next-line: max-line-length
    if ((document.getElementById('password') as HTMLInputElement).value !== (document.getElementById('confirm_password')as HTMLInputElement).value) {
      alert ('password dont match');
    }
  }
  // formValidation() {
    // tslint:disable-next-line: triple-equals
    // tslint:disable-next-line: max-line-length
    // if (document.getElementsByClassName('was-validated')) {
      // document.getElementsByClassName('was-validated')('needs-validation');
    // document.getElementsByClassName('was-validated').removeClass('needs-validation');
    // } else {

    // }
  // }


  OnSubmit(form: NgForm) {
    this.check();
    this.condition = true;
    this.userService.asJeweler(form.value)
    .subscribe((data: any) => {
      if (data.response === 201) {
        console.log(data);
        this.condition = false;
        this.resetForm();
      //  this.router.navigate(['/login']);
      } else {
        console.log(data);
      }
    },
    err => {
      console.log(err.message);
      }
    );
  }
  Login() {
    this.router.navigate(['login']);
  }
}
