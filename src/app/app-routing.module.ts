import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

const routes: Routes = [
  {
    'path': 'course',
    'component': CourseComponent,
  },
  {
    'path': 'studentdetails',
    'component': StudentdetailsComponent
  },
  { path: '', redirectTo: '/course', pathMatch: 'full' },
  {
    'path': 'login',
    'component': LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
