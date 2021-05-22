import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { statistic } from '../class/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  getTimeAvgByCategory(userCode:number){
    return this.http.get<statistic[]>("http://localhost:60584//api/statistics/GetTimeAvgByCategory?userCode="+userCode);

  }
 
  constructor(public http:HttpClient) { }
}
