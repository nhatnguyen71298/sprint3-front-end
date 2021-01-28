import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentMessageComponent } from './student-message/student-message.component';


export const routes: Routes = [
  {
    path: 'student',
    children: [
      {path: 'student-list', component: ListStudentComponent},
    ]
  },
];
@NgModule({
  declarations: [ListStudentComponent, AddStudentComponent, StudentDeleteComponent, StudentEditComponent, StudentMessageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class AppRoutingStudentModule { }
