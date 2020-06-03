import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import { ToDo } from './to-do.model';
import { Todonew } from './todonew.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteid = '';
  archiveid = '';
  Unarchiveid = '';
  status = '';
  search = '';
  label = '';
  color = '';

  constructor( public http: HttpClient ) { }
  readonly rootURL = 'https://stackhack.pythonanywhere.com/';

  asJeweler(user: User) {
    const body: User = {
      email: user.email,
      username: user.username,
      password: user.password,
      confirm_password: user.confirm_password,
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootURL + '/user/registration/', body, {headers : reqHeader});
  }

  loginUser(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const reqheaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.rootURL + '/user/login/', data , { headers: reqheaders });
  }
  create(todonew: Todonew) {
    const body: Todonew = {
      Title: todonew.Title,
      Description: todonew.Description,
      Status: todonew.Status,
      Color: todonew.Color,
      label: todonew.label,
      Remind: todonew.Remind,
      DueDate: todonew.DueDate,
    };
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.post(this.rootURL + 'Todo/todo/', body, {headers : Headers});
  }

  update(todo: ToDo) {
    const body: ToDo = {
      Title: todo.Title,
      Description: todo.Description,
      Status: todo.Status,
      Color: todo.Color,
      label: todo.label,
      Remind: todo.Remind,
      DueDate: todo.DueDate,
    };
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.put(this.rootURL + 'Todo/tododetail/' + localStorage.getItem('id'), body, {headers : Headers});
  }
  deletebyid() {
    const Headers = new HttpHeaders().set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.delete(this.rootURL + 'Todo/tododetail/' + this.deleteid , {headers: Headers});
  }

  Archiveread() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get(this.rootURL + 'Todo/ArcheiveList/', {headers: Headers});
  }
  Archive() {
    return this.http.put('https://stackhack.pythonanywhere.com/Todo/Archeive/' + this.archiveid, {headers: Headers});
  }
  Unarchive() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.put(this.rootURL + 'Todo/Remove-archeieve/' + this.Unarchiveid, {headers: Headers});
  }

  filter() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.rootURL + 'Todo/filter/?Status=' + this.status + '&label=' + this.label + '&Color=' + this.color + '&search=' + this.search, {headers: Headers});
  }

}

