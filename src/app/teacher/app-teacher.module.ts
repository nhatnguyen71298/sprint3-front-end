import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
import { StatisticsTeacherComponent } from './statistics/statistics-teacher/statistics-teacher.component';
import { StatisticsThesisComponent } from './statistics/statistics-thesis/statistics-thesis.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [StatisticsTeacherComponent, StatisticsThesisComponent],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class AppTeacherModule { }
