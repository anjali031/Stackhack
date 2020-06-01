import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToDo } from 'src/app/shared/to-do.model';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/user.model';
import { Todonew } from 'src/app/shared/todonew.model';
@Component({
  selector: 'app-to-do-read',
  templateUrl: './to-do-read.component.html',
  styleUrls: ['./to-do-read.component.css']
})
export class ToDoReadComponent implements OnInit {
  todo: ToDo;
  todonew: Todonew;
  data: any = {};
  i = '';
  id = '';
  token: boolean ;
  condition = false;
  condition1 = false;
  passwordMatch: string ;
  signuperror: any = {} ;
  signupSuccess: any = {};
  Loginerror: any = {} ;
  LoginSuccess: any = {};

  user: User;
  // tslint:disable-next-line: no-inferrable-types
  isLoginError: boolean = false;
  userpattern = '^[a-z0-9_-]{3,15}$';
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.read();
    this.tokenexists();
    this.resetForm1();
    this.resetForm2();
    this.archiveRead();
  }

  tokenexists() {
    if (localStorage.getItem('token')) {
      this.token = true;
    } else{
      this.token = false;
    }
  }
  use(index) {
    console.log(index);
    this.i = index;
    this.print();


  }
  archive(value) {
    console.log(value);
    this.userService.archiveid = value;
    console.log(this.userService.archiveid);
    this.userService.Archive().subscribe(data => {
      console.log( data);
      window.location.reload();
    });
  }


  read() {
    this.userService.read().subscribe(data => {
      console.log(data);
      this.data = data;
    },
    err => {
      console.log(err.message);
      }
    );
  }
  archiveRead() {
    this.userService.Archiveread().subscribe(data => {
      console.log('Archeve', data);
    });
  }

  print() {
    localStorage.setItem('id', this.data.data[this.i].id);
    this.todo.Title = this.data.data[this.i].Title;
    this.todo.Description = this.data.data[this.i].Description;
    if (this.data.data[this.i].Status === 'Start') {
      this.todo.Status = '1';
     }
    if (this.data.data[this.i].Status === 'Done') {
      this.todo.Status = '2';
    }
    if (this.data.data[this.i].Status === 'Ongoing') {
      this.todo.Status = '3';
    }
    if (this.data.data[this.i].Color === 'Red') {
      this.todo.Color = '1';
     }
    if (this.data.data[this.i].Color === 'Blue') {
      this.todo.Color = '2';
    }
    if (this.data.data[this.i].Color === 'Green') {
      this.todo.Color = '3';
    }
    if (this.data.data[this.i].Color === 'Voilet') {
      this.todo.Color = '4';
     }
    if (this.data.data[this.i].Color === 'Orange') {
      this.todo.Color = '5';
    }
    if (this.data.data[this.i].label === 'High') {
      this.todo.label = '1';
    }
    if (this.data.data[this.i].label === 'low') {
      this.todo.label = '2';
     }
    if (this.data.data[this.i].label === 'medium') {
      this.todo.label = '3';
    }

}
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.todo = {
      Title: '',
      Description: '',
      Status: '',
      Color: '',
      label: '',
      Remind: '',
      DueDate: '',
    };
  }
  resetForm1(form?: NgForm) {
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
  delete(value) {
    console.log(value);
    this.userService.deleteid = value;
    this.userService.deletebyid().subscribe((data: any) => {
      console.log(data);
      window.location.reload();
    });
  }
  resetForm2(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.todonew = {
      Title: '',
      Description: '',
      Status: '',
      Color: '',
      label: '',
      Remind: '',
      DueDate: '',
    };
  }
  check() {
    // tslint:disable-next-line: max-line-length
    if ((document.getElementById('password') as HTMLInputElement).value !== (document.getElementById('confirm_password')as HTMLInputElement).value) {
      this.passwordMatch = 'Unmatched';
      console.log(this.passwordMatch);
    } else {
      this.passwordMatch = 'Matched';
      console.log(this.passwordMatch);
    }
  }

  OnSubmit0(form: NgForm) {
    this.check();
    this.condition1 = true;
    if (this.passwordMatch === 'Matched'){
      this.userService.asJeweler(form.value)
      .subscribe((data: any) => {
        if (data.response === 201) {
          console.log(data);
          this.condition1 = false;
          this.signupSuccess = data;
          this.resetForm1();
         // window.location.reload();
          //  this.router.navigate(['/login']);
        } else {
          console.log(data);

          this.signuperror = data;
        }
      },
      err => {
        console.log(err.message);
         }
      );
    } else {
      console.log(this.passwordMatch);
    }

  }

  OnSubmit(form: NgForm) {
    this.userService.update(form.value)
    .subscribe((data: any) => {
      if (data.status === 200) {
        console.log(data);
        this.resetForm();
        window.location.reload();
      } else {
        console.log(data);
      }
    },
    err => {
      console.log(err.message);
      }
    );
  }
  OnSubmit1(form: NgForm) {
    this.userService.create(form.value)
    .subscribe((data: any) => {
      if (data.status === 200) {
        console.log(data);
        this.resetForm2();
        window.location.reload();
      } else {
        console.log(data);
      }
    },
    err => {
      console.log(err.message);
      }
    );
  }
  Logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  OnSubmit2(username, password) {
    this.condition = true;
    this.userService.loginUser(username, password).subscribe((data: any) => {
     // localStorage.setItem('token', data.data.token);
      if (data.response === 200 ) {
        localStorage.setItem('token' , data.data.token );
        this.condition = false;
        console.log(data);
        window.location.reload();
      } else {
        this.Loginerror = data;
        console.log(data);
      }
   },
   (err: HttpErrorResponse) => {
     this.isLoginError = true;
   });
 }

}
