import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoReadComponent } from './to-do/to-do-read/to-do-read.component';



const routes: Routes = [

  { path: 'todo/read', component: ToDoReadComponent},
  { path: '' , redirectTo: '/todo/read', pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
