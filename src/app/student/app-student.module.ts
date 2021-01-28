import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingStudentModule} from './app-routing-student.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MaterialModule} from '../material.module';



@NgModule({
  declarations: [],
  imports: [
    AppRoutingStudentModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
  ]
})
export class AppStudentModule { }
