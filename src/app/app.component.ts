import { Component } from '@angular/core';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAIonNQWAK4QMt7pryfYAZ71t4N5EbCI0g\n',
  databaseURL: 'https://tuongtac-e4ff0-default-rtdb.firebaseio.com'
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // firebase.initializeApp(config);
  }
}
