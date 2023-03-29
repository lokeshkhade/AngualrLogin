import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { MdComponentModule } from './md-component/md-component.module';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent, StudentdetailsComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdComponentModule,

    BrowserAnimationsModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
