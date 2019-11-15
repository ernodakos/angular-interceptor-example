import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpVerb } from '../interfaces/http-verb.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private authService:AuthService) { }

  public request<T>(method :HttpVerb, url: string,body?: any ):Observable<T>{
      return  this.http.request<T>(method,environment.apiEndpoint + url, 
      {
        body,
        headers:{
          Authorization: 'Bearer ' + this.authService.token,
          'Content-Type':'application/json'
        }
      }).pipe(
        tap(
          response=>{},
          errorResponse =>{
            const error = errorResponse.error.error;
            const tokenErrors = ['token_expired','token_invalid','token_not_provided'];
  
            if(tokenErrors.includes(error)){
                this.authService.logout();
            }
            window.alert(error?error:'Unexpected system error.');
          } 
        )
      );

  }
}
