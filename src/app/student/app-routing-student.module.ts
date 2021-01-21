import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
    ]
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AppRoutingStudentModule { }
