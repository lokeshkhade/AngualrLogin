import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseGuard } from './guards/course.guard';
import { StudentGuard } from './guards/student.guard';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

const routes: Routes = [


  {
    'path': 'sidebar',
    'component': SidebarComponent,
    children:[
      {
        'path': 'course',
        'component': CourseComponent,
        'canActivate':[CourseGuard]
      },
      {
        'path': 'studentdetails',
        'component': StudentdetailsComponent,
        'canActivate':[StudentGuard]
      },
    ]
  
    
  },
  
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    'path': 'login',
    'component': LoginComponent
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
