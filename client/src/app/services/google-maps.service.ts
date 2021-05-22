import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {distance} from '../class/distance';
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  // calcDistance(distObject:distance){
  //   return this.http.post("http://localhost:60584//api/distance/calcDistance",distObject)
  // }
  constructor(public http:HttpClient) { }
}
