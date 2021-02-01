import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingStudentModule} from './app-routing-student.module';
import {InteractionStudentComponent} from './interaction-student-teacher/interaction-student/interaction-student.component';
import {HistoryInteractionStudentComponent} from './interaction-student-teacher/history-interaction-student/history-interaction-student.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ContentInteractionStudentComponent} from './interaction-student-teacher/content-interaction-student/content-interaction-student.component';
import {DeleteInteractionStudentComponent} from './interaction-student-teacher/delete-interaction-student/delete-interaction-student.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';


// @ts-ignore
@NgModule({
  declarations: [InteractionStudentComponent, HistoryInteractionStudentComponent, ContentInteractionStudentComponent,
    DeleteInteractionStudentComponent],
  imports: [
    AppRoutingStudentModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    PickerModule,
    EmojiModule
  ],
  entryComponents: [DeleteInteractionStudentComponent]
})
export class AppStudentModule {
}
