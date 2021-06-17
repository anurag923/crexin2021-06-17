import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
var auth_token = sessionStorage.getItem('auth_token');
@Injectable()
export class CrexinInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({
    //   setHeaders: {
    //     'Authorization': `Bearer ${auth_token}`,
    //   }
    // });
    return next.handle(request);
  }
}
