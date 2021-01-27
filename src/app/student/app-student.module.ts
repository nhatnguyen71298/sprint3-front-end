import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingStudentModule} from './app-routing-student.module';
import {HttpClientModule} from '@angular/common/http'


@NgModule({
  declarations: [],
  imports: [
    AppRoutingStudentModule,
    CommonModule,
    HttpClientModule
  ]
})
export class AppStudentModule {
}
