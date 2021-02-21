import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SubscribeThesisComponent} from './subscribe-thesis/subscribe/subscribe-thesis.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ViewThesisComponent} from './subscribe-thesis/view-thesis/view-thesis.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationSubscribeComponent} from './subscribe-thesis/notification-subscribe/notification-subscribe.component';
import {ListInstructorComponent} from './mai-htq/list-instructor/list-instructor.component';
import {DetailTeacherComponent} from './mai-htq/detail-teacher/detail-teacher.component';
import {NotificationTeacherComponent} from './mai-htq/notification/notification-teacher.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { MessageStudentComponent } from './message-student/message-student.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentMessageComponent } from './student-message/student-message.component';
import { ListNewComponent } from './list-new/list-new.component';
import { DetailNewsComponent } from './detail-news/detail-news.component';
import { ConfirmComponent } from './subscribe-thesis/confirm/confirm.component';
import {ThesisDetailSendComponent} from './thesis-detail-send/thesis-detail-send.component';
import {InteractionStudentComponent} from './interaction-student-teacher/interaction-student/interaction-student.component';
import {DeleteInteractionStudentComponent} from './interaction-student-teacher/delete-interaction-student/delete-interaction-student.component';
import {ReportProgressComponent} from './report-progress/report-progress.component';
import {MatTabsModule} from '@angular/material/tabs';

export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'subscribe/:idStudent', component: SubscribeThesisComponent},
      {path: 'list-instructor/:idStudent', component: ListInstructorComponent},
      {path: 'student-list', component: ListStudentComponent},
      // {path: 'send-thesis-detail', component: ThesisDetailSendComponent},
      {path: 'progress', component: ReportProgressComponent},
      {path: 'interaction', component: InteractionStudentComponent}
    ]
  },
 // quoc
  {path: 'news', component: ListNewComponent},
  {path:'detail-news/:id',component:DetailNewsComponent}
  // endquoc
];

@NgModule({
  declarations: [SubscribeThesisComponent, ViewThesisComponent, NotificationSubscribeComponent,
    ListInstructorComponent, DetailTeacherComponent, NotificationTeacherComponent,
    AddStudentComponent, MessageStudentComponent, ListStudentComponent,
    StudentDeleteComponent, StudentEditComponent, StudentMessageComponent,
    ListNewComponent, DetailNewsComponent,ConfirmComponent, ThesisDetailSendComponent, DeleteInteractionStudentComponent,
    ReportProgressComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
  exports:[
    SubscribeThesisComponent, ViewThesisComponent, NotificationSubscribeComponent,
    ListInstructorComponent, DetailTeacherComponent, NotificationTeacherComponent,
    AddStudentComponent, MessageStudentComponent, ListStudentComponent,
    StudentDeleteComponent, StudentEditComponent, StudentMessageComponent,
    ListNewComponent, DetailNewsComponent,ConfirmComponent, ThesisDetailSendComponent, DeleteInteractionStudentComponent
  ],
  entryComponents: [ViewThesisComponent, NotificationSubscribeComponent, ReportProgressComponent]
})
export class AppRoutingStudentModule {
}
