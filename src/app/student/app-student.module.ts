import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from '../teacher/app-routing-teacher.module';
import {AppRoutingStudentModule} from './app-routing-student.module';



@NgModule({
  declarations: [],
  imports: [
    AppRoutingStudentModule,
    CommonModule
  ]
})
export class AppStudentModule { }
