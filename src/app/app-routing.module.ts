import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ToDoCreateComponent } from './to-do/to-do-create/to-do-create.component';
import { ToDoReadComponent } from './to-do/to-do-read/to-do-read.component';



const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'todo', component: ToDoCreateComponent},
  { path: 'todo/read', component: ToDoReadComponent},
  { path: '' , redirectTo: '/todo/read', pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
