import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppRoutingTeacherModule} from './app-routing-teacher.module';
import { StatisticsTeacherComponent } from './statistics/statistics-teacher/statistics-teacher.component';
import { StatisticsThesisComponent } from './statistics/statistics-thesis/statistics-thesis.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';



@NgModule({
  declarations: [StatisticsTeacherComponent, StatisticsThesisComponent],
  imports: [
    CommonModule,
    AppRoutingTeacherModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ]
})
export class AppTeacherModule { }
