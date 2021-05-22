import { Time } from '@angular/common';
export class schedule{
    constructor(public ScheduleId?:string, public ScheduleCode?:number, public EventCode?:number,public BusinessCode?:number,public EventDate?:Date,
        public Duration?:number,public Done?:boolean,public Cost?:number, public Hour?:string,
        public Description?:string, public Subject?:string)
    {
        ScheduleCode=0
    }
}
