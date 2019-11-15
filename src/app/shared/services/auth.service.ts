import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/user/dtos/user.dto';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { StuckedRequestsService } from './stucked-requests.service';

export interface AuthResponse{
  token: string,
  user: UserDto
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  public user: UserDto;

  constructor(private http: HttpClient,private router: Router,private stuckedRequestsService:StuckedRequestsService) { 
    this.loadFromStorage();
  }

  public login(user:UserDto):Observable<AuthResponse>
  {
    return this.http.post<AuthResponse>( environment.apiEndpoint + '/auth',user).pipe(
      tap(
        response => {
          this.token = response.token,
          this.user = response.user,
  
          this.saveToStorage();
          //Resend queuse
          this.stuckedRequestsService.resendStuckedRequestes(this.token);
        }
      )
    );
    
  }

  public logout(){
    this.token = undefined;
    this.user = undefined;

    this.saveToStorage();
    this.router.navigate(['/']);
  }

  private saveToStorage(){
    if(this.user){
      localStorage.setItem('user', JSON.stringify( this.user));
    }
    else{
      localStorage.removeItem('user');
    }

    if(this.token){
      localStorage.setItem('token', this.token);
    }
    else{
      localStorage.removeItem('token');
    }
  }

  private loadFromStorage(){
    this.token = localStorage.getItem('token');
    let userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : undefined;
  }

  public logQueueRequested(){
    console.log(this.stuckedRequestsService.requestQueue);
  }

  public resenStuckedRequests(){
    this.stuckedRequestsService.resendStuckedRequestes(this.token);
  }

}
