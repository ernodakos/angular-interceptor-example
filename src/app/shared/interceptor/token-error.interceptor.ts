
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { StuckedRequestsService } from '../services/stucked-requests.service';


@Injectable()
export class TokenErrorInterceptor implements HttpInterceptor {

  constructor(private stuckedRequestsService:StuckedRequestsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
        const errorMessage = error.error.error;

        const tokenErrors = ['token_expired','token_invalid','token_not_provided'];

        if(tokenErrors.includes(errorMessage)){
           return new Observable<HttpEvent<any>>((observer) => {
                    this.stuckedRequestsService.requestQueue.push({eventObserver: observer, request: request, handler: next});
                });
        }
       
        return throwError(error);
      }));

    
    }
  }