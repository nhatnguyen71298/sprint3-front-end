import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ListStudentNoGroupComponent } from './list-student-no-group/list-student-no-group.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxPaginationModule} from 'ngx-pagination';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
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
  declarations: [FeedBackComponent, CreateGroupComponent, ListStudentNoGroupComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        NgxPaginationModule
    ],
})
export class AppRoutingTeacherModule { }
