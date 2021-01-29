import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListInstructorComponent} from './mai-htq/list-instructor/list-instructor.component';
import { DetailTeacherComponent } from './mai-htq/detail-teacher/detail-teacher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import {NotificationTeacherComponent} from './mai-htq/notification/notification-teacher.component';

export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'list-instructor/:idStudent', component: ListInstructorComponent},
    ]
  },
];
@NgModule({
  declarations: [ListInstructorComponent, DetailTeacherComponent, NotificationTeacherComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AppRoutingStudentModule { }
