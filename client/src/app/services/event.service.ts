import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { event } from 'src/app/class/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  [x: string]: any;
  getEventByUserCode(code:number){
    return this.http.get<event>("http://localhost:60584//api/events/getEventByUserCode?userCode="+code)

  }
  // private shippingURL : string = 'http://localhost:60584//api/events/newEvent';

  newEvent(e:event) {


    return this.http.post("http://localhost:60584//api/events/newEvent", e)
  }

  constructor(public http:HttpClient) { }
}





