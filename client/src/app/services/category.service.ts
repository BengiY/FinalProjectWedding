import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from 'src/app/class/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getAllCategory(): Observable<any> {
    return  new Observable(subscriber => {this.http.get<category[]>("http://localhost:60584//api/category/getAllCategory")
    .subscribe(res => {
                    // Do my service.ts logic.
                    // ...
                    subscriber.next(res)
                    subscriber.complete()
                }, err => subscriber.error(err))
    })
  }


  constructor(public http:HttpClient) { }
}