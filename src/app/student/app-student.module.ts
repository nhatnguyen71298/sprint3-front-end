import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingStudentModule} from './app-routing-student.module';
import {ThesisDetailService} from '../service/thesis-detail.service';


@NgModule({
  declarations: [],
  imports: [
    AppRoutingStudentModule,
    CommonModule
  ],
  providers: [ThesisDetailService]
})
export class AppStudentModule {
}
