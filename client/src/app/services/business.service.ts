import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { business } from 'src/app/class/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  getAllBusniess(): Observable<business[]>
  {
    return new Observable(subscriber => {  
      this.http.get<business[]>("http://localhost:60584//api/business/getAllBusniess")
          .subscribe(res => {
              // Do my service.ts logic.
              // ...
              subscriber.next(res)
              subscriber.complete()
          }, err => subscriber.error(err))
    })
  }
//   getData(): Observable<any> {
//     return new Observable(subscriber => {
//         this.http.get(url)
//           .pipe(catchError(this.handleError)
//           .subscribe(res => {
//               // Do my service.ts logic.
//               // ...
//               subscriber.next(res)
//               subscriber.complete()
//           }, err => subscriber.error(err))
//     })
// }
  
  getBusinessByCategoryCode(t:number)
  {
    return this.http.post<business[]>("http://localhost:60584//api/business/getBusinessByCategoryCode?code="+ t,{body:business})
  }
  newBusiness(b:business){
    return this.http.post("http://localhost:60584//api/business/newBusiness",b)
  }
  getBussinessByOwnerCode(code:string)
  {
    return this.http.get<business[]>("http://localhost:60584//api/business/getBussinessByOwnerCode?code="+code);
  }
  getCategoryCodeByBusinessCode(code:number)
  {
    return this.http.post<number>("http://localhost:60584//api/business/getCategoryCodeByBusinessCode",code);
  }
  constructor(public http:HttpClient) { }
}
