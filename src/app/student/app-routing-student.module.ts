import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';


export const routes: Routes = [
  {
    path: 'student',
    children: [
      {path: 'student-list', component: ListStudentComponent},
    ]
  },
];
@NgModule({
  declarations: [ListStudentComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AppRoutingStudentModule { }
