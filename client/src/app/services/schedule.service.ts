import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { schedule } from 'src/app/class/schedule';
import { mustList } from 'src/app/class/mustList';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  newSchedule(s: schedule): Observable<schedule> {
    return new Observable(subscriber => {
      this.http.post("http://localhost:60584//api/schedule/newSchedule", s)
    .subscribe(res => {
        // Do my service.ts logic.
        // ...
        subscriber.next(res)
        subscriber.complete()
      }, err => subscriber.error(err))
    })
  }


getAllScheduleByEventCode(code: number){
  return this.http.get<schedule[]>("http://localhost:60584//api/schedule/getAllScheduleByEventCode?eventCode=" + code);

}
getLastScheduleId(){
  return this.http.get<string>("http://localhost:60584//api/schedule/getLastScheduleId");
}
removeSchedule(id: string){
  return this.http.get<string>("http://localhost:60584//api/schedule/removeSchedule?id=" + id);
}
getmustList(id: string){
  return this.http.get<mustList[]>("http://localhost:60584//api/schedule/GetmustList?id=" + id);
}
constructor(public http: HttpClient) { }

}
