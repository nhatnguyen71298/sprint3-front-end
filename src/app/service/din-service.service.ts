import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DinServiceService {
  private api = 'http://localhost:8080/interaction/';
  private apiNotification = 'http://localhost:8080/notification/';

  constructor(private http: HttpClient) {
  }

  createInteraction(content, title, accountStudent): Observable<any> {
    return this.http.post(this.api + 'create/' + content + '/' + title + '/' + accountStudent, '');
  }

  getAllInteraction(accountStudent, page): Observable<any> {
    return this.http.get(this.api + 'findAll/' + accountStudent + '/' + page);
  }

  searchInteractionTitle(accountStudent, page, title): Observable<any> {
    return this.http.get(this.api + 'findAll/' + accountStudent + '/' + page + '/' + title)
  }

  deleteInteractionById(idInteraction): Observable<any> {
    return this.http.delete(this.api + 'delete/' + idInteraction)
  }

  searchById(idInteraction): Observable<any> {
    return this.http.get(this.api + 'findById/' + idInteraction)
  }

  createNotification(idInteraction, idAccount): Observable<any> {
    return this.http.post(this.apiNotification + 'create/' + idInteraction + '/' + idAccount, '');
  }

}
