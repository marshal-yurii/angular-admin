import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token to whitelisted origins
    const apiUrl = new URL(environment.apiUrl).origin;
    const allowedOrigins = [window.location.origin, apiUrl];
    const requestUrl = new URL(request.url).origin;

    if (allowedOrigins.some((url) => requestUrl.includes(url))) {
      const accessToken = 'hash-token';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }

    return next.handle(request).toPromise();
  }
}
