import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken:any = localStorage.getItem('token');
    console.log("Interceptor Token",authToken);
    const authReq = request.clone({
      headers: request.headers.set('x-auth-token', authToken)
    });



    return next.handle(authReq);
  }
}
