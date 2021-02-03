import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingStudentModule} from './app-routing-student.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MaterialModule} from '../material.module';
import {ThesisDetailService} from '../service/thesis-detail.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteInteractionStudentComponent} from './interaction-student-teacher/delete-interaction-student/delete-interaction-student.component';
import {InteractionStudentComponent} from './interaction-student-teacher/interaction-student/interaction-student.component';
import {HistoryInteractionStudentComponent} from './interaction-student-teacher/history-interaction-student/history-interaction-student.component';
import {ContentInteractionStudentComponent} from './interaction-student-teacher/content-interaction-student/content-interaction-student.component';


@NgModule({
  declarations: [InteractionStudentComponent,HistoryInteractionStudentComponent,ContentInteractionStudentComponent],
  imports: [
    AppRoutingStudentModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    PickerModule,
    EmojiModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [ThesisDetailService],
  entryComponents: [DeleteInteractionStudentComponent]

})
export class AppStudentModule { }
