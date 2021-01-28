import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import { FeedBackComponent } from './feed-back/feed-back.component';
import {StatisticsTeacherComponent} from './statistics/statistics-teacher/statistics-teacher.component';
import {StatisticsThesisComponent} from './statistics/statistics-thesis/statistics-thesis.component';
import {ListThesisComponent} from './thesis/list-thesis/list-thesis.component';
import {DeleteThesisComponent} from './thesis/delete-thesis/delete-thesis.component';
import {DetailThesisComponent} from './thesis/detail-thesis/detail-thesis.component';
import {CreateThesisComponent} from './thesis/create-thesis/create-thesis.component';
import {QuantityStudentGroupComponent} from './student-group-management/quantity-student-group/quantity-student-group.component';
import {NotificationThesisComponent} from './thesis/notification-thesis/notification-thesis.component';
import {ManagementStudentGroupComponent} from './student-group-management/management-student-group/management-student-group.component';
import {MessageThesisComponent} from './thesis/message-thesis/message-thesis.component';
import {DeleteGroupStudentComponent} from './student-group-management/delete-group-student/delete-group-student.component';
import {EditThesisComponent} from './thesis/edit-thesis/edit-thesis.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {MatButtonModule} from '@angular/material/button';
import {NgxPaginationModule} from 'ngx-pagination';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'statistics-teacher', component: StatisticsTeacherComponent},
      {path: 'statistics-thesis', component: StatisticsThesisComponent},
      {path: 'thesis-list', component: ListThesisComponent},
      {path: 'student-group-list', component: ManagementStudentGroupComponent},
    ]
  },
];
@NgModule({
  declarations: [FeedBackComponent, ListThesisComponent, DetailThesisComponent, EditThesisComponent,
    DeleteThesisComponent, CreateThesisComponent, ManagementStudentGroupComponent, DeleteGroupStudentComponent,
    QuantityStudentGroupComponent,
    MessageThesisComponent,
    NotificationThesisComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MaterialModule,
    FormsModule,
    MatButtonModule
  ],
})
export class AppRoutingTeacherModule { }
