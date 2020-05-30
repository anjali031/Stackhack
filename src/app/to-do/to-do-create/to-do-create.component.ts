import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import {ToDo} from '../../shared/to-do.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-create',
  templateUrl: './to-do-create.component.html',
  styleUrls: ['./to-do-create.component.css']
})
export class ToDoCreateComponent implements OnInit {
  todo: ToDo;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
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
      Priority: '',
    };
  }

  OnSubmit(form: NgForm) {
    this.userService.create(form.value)
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

}
