import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import {FeedBackComponent} from './feed-back/feed-back.component';
import {TeacherListComponent} from './teacher-management/teacher-list/teacher-list.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeacherAddComponent} from './teacher-management/teacher-add/teacher-add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {SuccessComponent} from './teacher-management/success/success.component';
import {SearchComponent} from './teacher-management/alert/search/search.component';
import {NoResultComponent} from './teacher-management/alert/no-result/no-result.component';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'teacher-list', component: TeacherListComponent},
      {path: 'teacher-add', component: TeacherAddComponent}
    ]
  },
];

@NgModule({
  declarations: [FeedBackComponent, TeacherListComponent, TeacherAddComponent, SuccessComponent, SearchComponent, NoResultComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule
  ],
})
export class AppRoutingTeacherModule {
}
