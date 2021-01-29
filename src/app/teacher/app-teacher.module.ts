import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
// @ts-ignore
import {ToastrModule} from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    } )
  ]
})
export class AppTeacherModule { }
