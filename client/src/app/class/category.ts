import { Time } from "@angular/common";

export class category{
    constructor(public CategoryCode?:number, public CategoryName?:string,public GroomOrBride?:number,public AverageDuration?:number,public StartHour?:Time,public EndHour?:Time)
    {}
}

