import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  private apiFeedBack= 'http://localhost:8080/api/7';
  constructor(private http: HttpClient, private fireservices: AngularFirestore) { }

  getTeacherByAppAcount(idAccount){
    return this.http.get(this.apiFeedBack + '/teacherInfo/' + idAccount);
  }
  getAllFeedBack(idAccount): Observable<any>{
    return this.http.get(this.apiFeedBack + '/' + idAccount);
  }
  getInfoQuestion(idQuestion): Observable<any>{
    return this.http.get(this.apiFeedBack + '/infoQuestion/' + idQuestion);
  }
  deleteQuestion(idQuestion): Observable<any>{
    return this.http.delete(this.apiFeedBack + '/infoQuestion/' + idQuestion);
  }

  // firebase
  createInteraction(idInteraction: string, record) {
    return this.fireservices.collection(idInteraction).doc(new Date().toString()).set(record);
  }

  getAllInteraction(idInteraction: string) {
    return this.fireservices.collection(idInteraction).snapshotChanges();
  }

  updateInteraction(recordid, record) {
    this.fireservices.doc('Employee/' + recordid).update(record);
  }

  deleteInteraction(idInteraction: string,recordId) {
    this.fireservices.doc(idInteraction+ '/' + recordId).delete();
  }
}
