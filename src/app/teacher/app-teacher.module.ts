import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {InstructionDocumentService} from '../service/instruction-document.service';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatDialogModule
  ],
  providers: [InstructionDocumentService]
})
export class AppTeacherModule {
}
