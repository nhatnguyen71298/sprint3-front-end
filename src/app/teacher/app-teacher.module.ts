import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    HttpClientModule
  ]
})
export class AppTeacherModule { }
