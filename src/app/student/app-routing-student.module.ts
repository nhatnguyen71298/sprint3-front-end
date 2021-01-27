import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


export const routes: Routes = [
  {
    path: 'student',
    children: [
      {path: 'student-list', component: ListStudentComponent},
    ]
  },
];
@NgModule({
  declarations: [ListStudentComponent, AddStudentComponent],
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
