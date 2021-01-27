import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ]
})
export class AppTeacherModule { }
