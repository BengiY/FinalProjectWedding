import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distance } from '../class/distance';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  calcDistance(d: distance): Observable<number> {
     
    return this.http.post<number>("http://localhost:60584//api/distance/CalcDistance", d)
    }
  constructor(public http: HttpClient) { }
}



