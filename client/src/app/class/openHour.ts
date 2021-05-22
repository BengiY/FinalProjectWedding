import { Time } from '@angular/common';

export class openHour{
    constructor(public OpeningCode?:number, public BusinessCode?:number,public DayInWeek?:string, public StartHour?:Time,public EndHour?:Time)
    {OpeningCode=0}
}

