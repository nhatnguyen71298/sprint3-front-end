import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import { FeedBackComponent } from './feed-back/feed-back.component';
import {StatisticsTeacherComponent} from './statistics/statistics-teacher/statistics-teacher.component';
import {StatisticsThesisComponent} from './statistics/statistics-thesis/statistics-thesis.component';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'statistics-teacher', component: StatisticsTeacherComponent},
      {path: 'statistics-thesis', component: StatisticsThesisComponent},
    ]
  },
];
@NgModule({
  declarations: [FeedBackComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
})
export class AppRoutingTeacherModule { }
