import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import { FeedBackComponent } from './feed-back/feed-back.component';
import {MaterialModule} from "../material.module";
import { FeedBackDialogComponent } from './feed-back-dialog/feed-back-dialog.component';
import {FormsModule} from "@angular/forms";
import { OutsideDirective } from './outside.directive';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
    ]
  },
];
@NgModule({
  declarations: [FeedBackComponent, FeedBackDialogComponent, OutsideDirective],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  providers: [DatePipe],
})
export class AppRoutingTeacherModule { }
