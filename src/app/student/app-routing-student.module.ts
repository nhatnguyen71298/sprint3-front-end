import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeThesisComponent} from './subscribe-thesis/subscribe/subscribe-thesis.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ViewThesisComponent} from './subscribe-thesis/view-thesis/view-thesis.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NotificationComponent} from './subscribe-thesis/notification/notification.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListInstructorComponent} from './mai-htq/list-instructor/list-instructor.component';
import {DetailTeacherComponent} from './mai-htq/detail-teacher/detail-teacher.component';
import {NotificationTeacherComponent} from './mai-htq/notification/notification-teacher.component';

export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'subscribe/:idStudent', component: SubscribeThesisComponent},
      {path: 'list-instructor/:idStudent', component: ListInstructorComponent},
    ]
  },
];

@NgModule({
  declarations: [SubscribeThesisComponent, ViewThesisComponent, NotificationComponent,
    ListInstructorComponent, DetailTeacherComponent, NotificationTeacherComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ViewThesisComponent, NotificationComponent]
})
export class AppRoutingStudentModule {
}
