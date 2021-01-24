import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FeedBackComponent} from './feed-back/feed-back.component';
import {InstructionDocumentComponent} from './instruction-document/instruction-document.component';
import {DropzoneDirective} from './instruction-document/dropzone.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InstructionDeleteComponent } from './instruction-document/instruction-delete/instruction-delete.component';
import { InstructionMessageComponent } from './instruction-document/instruction-message/instruction-message.component';
import {MatDialogModule} from '@angular/material/dialog';

export const routes: Routes = [
  {
    path: 'teacher',
    children: [
      {path: 'feed-back', component: FeedBackComponent},
      {path: 'instruction', component: InstructionDocumentComponent}
    ]
  },
];
@NgModule({
  declarations: [FeedBackComponent, InstructionDocumentComponent, DropzoneDirective, InstructionDeleteComponent, InstructionMessageComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
})
export class AppRoutingTeacherModule { }
