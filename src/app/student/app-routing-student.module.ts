// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {CommonModule} from '@angular/common';
// @ts-ignore
import {RouterModule, Routes} from '@angular/router';
import {InteractionStudentComponent} from './interaction-student-teacher/interaction-student/interaction-student.component';

export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'interaction', component: InteractionStudentComponent}
    ]
  },
];

// @ts-ignore
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AppRoutingStudentModule {
}
