import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserComponent } from './user/user.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User = null;
  private userUrl="http://167.179.105.202:8000/";

  httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {}
  login(username:string, password:string):Observable<User>
  {
    const url=`${this.userUrl}login/`;
    return this.http.post<User>(url,{
      'username':username,
      'password':password}
      ,this.httpOptions).pipe(
        tap( (newUser:User) =>this.user=newUser),
    );
  }
  logout():void
  {
    this.user=null;
  }
  register(username:string, password:string):Observable<User>
  {
    const url=`${this.userUrl}register/`;
    return this.http.post<User>(url,{
      'username':username,
      'password':password}
      ,this.httpOptions).pipe(
        tap( (newUser:User) =>this.user=newUser),

    );
  }
  gettoken():string{
    if(this.user)
    return this.user.token;
    return "";
  }
  
  getusername():string{
    if(this.user)return this.user.name;
    return "";
  }

}
