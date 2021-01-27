import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedBackComponent} from './feed-back/feed-back.component';
import {ListStudentComponent} from './list-student/list-student.component';
import {CheckThesisComponent} from './check-thesis/check-thesis.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailContentThesisComponent} from './detail-content-thesis/detail-content-thesis.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'list-student', component: ListStudentComponent},
      {path: 'check-thesis', component: CheckThesisComponent},
    ]
  },
];

@NgModule({
  declarations: [FeedBackComponent, ListStudentComponent, CheckThesisComponent, DetailContentThesisComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
})
export class AppRoutingTeacherModule {
}
