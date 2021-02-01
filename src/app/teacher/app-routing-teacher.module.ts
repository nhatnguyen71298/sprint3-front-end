import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import { MessageGroupStudentComponent } from './student-group-management/message-group-student/message-group-student.component';
import { FeedBackDialogComponent } from './feed-back-dialog/feed-back-dialog.component';
import { OutsideDirective } from './outside.directive';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ListStudentNoGroupComponent } from './list-student-no-group/list-student-no-group.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TeacherAddComponent} from './teacher-management/teacher-add/teacher-add.component';
import {SuccessComponent} from './teacher-management/success/success.component';
import {SearchComponent} from './teacher-management/alert/search/search.component';
import {NoResultComponent} from './teacher-management/alert/no-result/no-result.component';
import {TeacherListComponent} from './teacher-management/teacher-list/teacher-list.component';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'statistics-teacher', component: StatisticsTeacherComponent},
      {path: 'statistics-thesis', component: StatisticsThesisComponent},
      {path: 'thesis-list', component: ListThesisComponent},
      {path: 'student-group-list', component: ManagementStudentGroupComponent},
      {path: 'teacher-list', component: TeacherListComponent},
      {path: 'teacher-add', component: TeacherAddComponent},
      {path: 'statistics', component: StatisticsTeacherComponent},
    ]
  },
  {
    // quoc
    path: 'teacher',
    children: [
      {path: 'create-group', component: CreateGroupComponent},
    ]
    // endquoc
  }

];
@NgModule({
  declarations: [FeedBackComponent, ListThesisComponent, DetailThesisComponent, EditThesisComponent,
    FeedBackDialogComponent, OutsideDirective,
    DeleteThesisComponent, CreateThesisComponent, ManagementStudentGroupComponent, DeleteGroupStudentComponent,
    QuantityStudentGroupComponent,
    MessageThesisComponent,
    NotificationThesisComponent,
    MessageGroupStudentComponent, CreateGroupComponent, ListStudentNoGroupComponent,
    TeacherListComponent, TeacherAddComponent, SuccessComponent, SearchComponent, NoResultComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MaterialModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [DatePipe],
})
export class AppRoutingTeacherModule { }
