import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DinInteractionService {

  constructor(private fireservices: AngularFirestore) { }

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
