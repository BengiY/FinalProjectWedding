import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AxiomSchedulerEvent } from 'axiom-scheduler';
import * as moment from 'moment';
import { business } from 'src/app/class/business';
import { category } from 'src/app/class/category';
import { event } from 'src/app/class/event';
import { detailsFromStatistic } from 'src/app/class/detailsFromStatistic';
import { schedule } from 'src/app/class/schedule';
import { ALL_SCHEDULER, SAMPLE_EVENTS } from 'src/app/sample-events';
import { BusinessService } from 'src/app/services/business.service';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { scheduleTolist } from 'src/app/class/scheduleTolist';
@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {
  userCode: number;
  eventCode: event;
  scheduleList: schedule[] = [];
  allBusiness: business[] = [];
  detailsFromUser: detailsFromStatistic = new detailsFromStatistic()
  // listWithBusinessName:any[]=[{Subject:':נושא',BusinessName:':שם עסק',EventDate:':תאריך אירוע',Hour:':שעה',Description:':תיאור'}];
  listWithBusinessName: scheduleTolist[] = [];
  contentEditable: boolean = false;
  selectSchedule: scheduleTolist = new scheduleTolist();
  selectScheduleToEdit: schedule = new schedule();
  userNow: string;
  ViewLoginOrRegister: boolean=false;
  ViewInputs: boolean=true;
  title: string;
  showMessage: boolean=false;
  hasList:boolean=true;


  constructor(public EventSer: EventService, public ScheduleSer: ScheduleService, public BusinessSer: BusinessService) { }
  sortData() {
    return this.scheduleList.sort((a, b) => {
      return <any>new Date(a.EventDate) - <any>new Date(b.EventDate);
    });
  }
  crossAndpopUp(event) {
    // if ( event.target.checked ) {

    console.log(event);
    this.contentEditable = true;


  }
  initialize() {
    this.listWithBusinessName = [];
    this.sortData();
    for (let scheduleElement of this.scheduleList) {
      for (let businnessElement of this.allBusiness) {
        if (scheduleElement.BusinessCode == businnessElement.BusinessCode) {
          var color;
          if (scheduleElement.Done) {
            color = "gray";
          }
          this.listWithBusinessName.push(new scheduleTolist(scheduleElement.Subject, businnessElement.BusinessName,
            scheduleElement.EventDate, scheduleElement.Description, scheduleElement.ScheduleId, scheduleElement.Hour, color));
          color = "black";
          break;
        }

      }

    }
    console.log(this.listWithBusinessName)
  }

  ngOnInit(): void {
    this.userNow = sessionStorage.getItem("userNow");
    if (this.userNow != null) {
      this.title="לצורך ביצוע סטטיסטיקות נשמח שתשתף אותנו בפרטים הבאים:";
      var eventCode = sessionStorage.getItem("EventCode");
      this.ScheduleSer.getAllScheduleByEventCode(Number(eventCode)).subscribe(suc => {
        this.scheduleList = suc;
          // this.initialize();
          this.BusinessSer.getAllBusniess().subscribe(suc => { this.allBusiness = suc; this.initialize() }, err => { console.log(err) });


      },
        err => { console.log("error get schedule list") ;
        if(err!=null)
        {
          this.hasList=false;
          this.showMessage=true;
        }})
    }
    else{
      this.title="אינך מחובר!";
      this.ViewInputs=false;
      this.ViewLoginOrRegister=true;
      this.display="block";
    }

    // this.EventSer.getEventByUserCode(this.userCode).subscribe(suc => {this.eventCode = suc; },err=>{console.log(err)});

  }
  display = "none";

  openModal(x?, i?) {
    this.selectSchedule = x;
    // if(this.listWithBusinessName[i].color=="gray")
    // {
    this.listWithBusinessName[i].color = "gray";
    // }
    this.display = "block";
  }
  onCloseHandled() {
    console.log(this.detailsFromUser)
    this.display = "none";
    if (this.detailsFromUser != null) {
      for (let s of this.scheduleList) {
        if (s.ScheduleId == this.selectSchedule.ScheduleId) {
          this.selectScheduleToEdit = s;
          break;
        }
      }
      this.selectScheduleToEdit.Cost = Number(this.detailsFromUser.Cost);
      this.selectScheduleToEdit.Duration = this.detailsFromUser.Duration;
      this.selectScheduleToEdit.Done = true;


      this.ScheduleSer.newSchedule(this.selectScheduleToEdit).subscribe(suc => {
        console.log(suc)
        this.detailsFromUser.Cost = null;
        this.detailsFromUser.Duration = null;
      }, err => { console.log("error edit task") });
    }

  }


}
