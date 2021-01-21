import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor{

  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // you probably want to store it in localStorage or something
    const token = localStorage.getItem('token');

    if (req.headers.get('skip')) {
      return next.handle(req);
    }

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(req1);
  }

}
