import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_KEY, API_TOKEN, API_URL} from '../constants/api.constants';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(API_URL) private apiUrl: string, @Inject(API_KEY) private apiKey: string, @Inject(API_TOKEN) private apiToken: string) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let params = req.params
      ? req.params.append(this.apiToken, this.apiKey)
      : new HttpParams().append(this.apiKey, this.apiToken);
    let updatedRequest = req.clone({url: `${this.apiUrl}/${req.url}`, params});
    return next.handle(updatedRequest);
  }
}
