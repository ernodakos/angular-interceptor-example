import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/user.dto';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiEndPoint:string = "/user";
  
  constructor(private http: HttpClient) { }

  public register(user:UserDto):Observable<UserDto>
  {
    return this.http.post<UserDto>( environment.apiEndpoint + this.apiEndPoint + '/register',user);
  }

}
