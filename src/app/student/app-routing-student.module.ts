import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { SignUpInstructorComponent } from './mai-htq/sign-up-instructor/sign-up-instructor.component';
import { DetailTeacherComponent } from './mai-htq/detail-teacher/detail-teacher.component';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';


export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'sign-up-instructor', component: SignUpInstructorComponent},
    ]
  },
];
@NgModule({
  declarations: [SignUpInstructorComponent, DetailTeacherComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule
  ]
})
export class AppRoutingStudentModule { }
