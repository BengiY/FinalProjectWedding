import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { openHour } from '../class/openHour';

@Injectable({
  providedIn: 'root'
})
export class OpeningHourService {
  
  newHours(hourList:openHour[])
  {
    return this.http.post("http://localhost:60584//api/hours/newHours",hourList);
  }
  getHoursByBusinessCode(code:number)
  {
    return this.http.get<openHour[]>("http://localhost:60584//api/hours/getHoursByBusinessCode?businessCode="+code);
  }
  constructor(public http:HttpClient) { }
}
