import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mail } from 'src/app/class/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  sendMail(mailObj:mail) {
    return this.http.post("http://localhost:60584//api/mail/sendMail",mailObj);
  }
  constructor(public http:HttpClient) { }
}
