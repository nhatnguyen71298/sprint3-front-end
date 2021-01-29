import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ListNewComponent } from './list-new/list-new.component';
import { DetailNewsComponent } from './detail-news/detail-news.component';
import {NgxPaginationModule} from 'ngx-pagination';

export const routes: Routes = [
  {
    path: 'student',
    children: [
    ]
  },
 // quoc
  {path: 'news', component: ListNewComponent},
  {path:'detail-news/:id',component:DetailNewsComponent}
  // endquoc
];
@NgModule({
  declarations: [ListNewComponent, DetailNewsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgxPaginationModule
    ]
})
export class AppRoutingStudentModule { }
