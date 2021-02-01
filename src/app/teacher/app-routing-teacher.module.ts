import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedBackComponent} from './feed-back/feed-back.component';
import {InstructionDocumentComponent} from './instruction-document/instruction-document.component';
import {DropzoneDirective} from './instruction-document/dropzone.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InstructionDeleteComponent} from './instruction-document/instruction-delete/instruction-delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import {ThesisDetailListComponent} from './thesis-detail-list/thesis-detail-list.component';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'instruction', component: InstructionDocumentComponent},
      {path: 'thesis-detail-list', component: ThesisDetailListComponent}
    ]
  },
];

@NgModule({
  declarations: [FeedBackComponent, InstructionDocumentComponent, DropzoneDirective, InstructionDeleteComponent, ThesisDetailListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxPaginationModule
  ],
})
export class AppRoutingTeacherModule {
}
