import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  gettAll()
  {
    return this.http.get<user[]>("http://localhost:60584//api/user/GetAll")
  }

  ExistUser(u:user)
  {
    return this.http.post("http://localhost:60584//api/user/existUser",u)
  }

  NewUser(u:user){
    return this.http.post("http://localhost:60584//api/user/NewUser",u);
  }
  constructor(public http:HttpClient) { }
}