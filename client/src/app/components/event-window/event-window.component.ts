import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiomSchedulerEvent } from 'axiom-scheduler';
import * as moment from 'moment';
import { business } from 'src/app/class/business';
import { openHour } from 'src/app/class/openHour';
import { schedule } from 'src/app/class/schedule';
import { ALL_SCHEDULER, SAMPLE_EVENTS } from 'src/app/sample-events';
import { BusinessService } from 'src/app/services/business.service';
import { CategoryService } from 'src/app/services/category.service';
import { EventService } from 'src/app/services/event.service';
import { OpeningHourService } from 'src/app/services/opening-hour.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { category } from '../../class/category';
import { event } from '../../class/event';
import { HomeComponent } from '../home/home.component';
import { DistanceService } from 'src/app/services/distance.service';
import { distance } from 'src/app/class/distance';
import { Time } from '@angular/common';
import { compileFactoryFunction } from '@angular/compiler';

@Component({
  selector: 'app-event-window',
  templateUrl: './event-window.component.html',
  styleUrls: ['./event-window.component.scss']
})
export class EventWindowComponent implements OnInit {

  public model: AxiomSchedulerEvent;
  public fromTime: string;
  public toTime: string;

  public events = [...SAMPLE_EVENTS];
  public allSchedule = [...ALL_SCHEDULER];
  //
  form;
  viewTo: boolean = false;
  userCode: number;
  currentEvent: event = new event();
  newSchedule = new schedule();
  //array by category
  arrBusiness: business[] = [];
  selectedBusiness: business = new business();
  arrCategory: category[] = [];
  viewBusiness: boolean = false;
  selectedCategory: number;
  FullCategory: category = new category();
  fort: string;
  inputValue: string = "";
  lastScheduleId: string;
  lastID: number;
  nextSchedule: boolean = false;
  viewDatatToEdit: schedule = new schedule();
  viewChooseBussinessAndCategory: boolean = false;
  group: boolean = true;
  arrAllBusiness: business[] = [];
  business: string;
  category: string;
  currentBusiness: business;
  openHourArr: openHour[] = [];
  viewBusinessDetails: boolean = false;
  title: string;
  subject: string;
  resultHour: schedule = new schedule();
  resultDistance: number;
  timeTask: number;
  hourArriving: Time;
  beforeHour: string;
  allScheduletoRefresh: schedule[] = []
  ezerAx: AxiomSchedulerEvent = new AxiomSchedulerEvent();
  cnt1: number = 0;
  cnt2: number = 0;
  currentB;
  beforeB;

  constructor(public distanceSer: DistanceService, public OpenHourSer: OpeningHourService, public modal: NgbActiveModal, public router: Router, public EventSer: EventService, public BusinessSer: BusinessService, public CategorySer: CategoryService, public ScheduleSer: ScheduleService) {
  }
  getDataToShow() {

    this.group = false;
    ALL_SCHEDULER.forEach(element => {
      if (element.ScheduleId == this.model.data.id) {
        this.viewDatatToEdit = element;
        return false;
      }

    });
    // console.log(this.viewDatatToEdit)
    this.inputValue = this.viewDatatToEdit.Description;
    this.arrAllBusiness.forEach(element => {
      if (element.BusinessCode == this.viewDatatToEdit.BusinessCode) {
        this.business = element.BusinessName;
        this.category = element.CategoryCode.toString();
        return false;
      }
    });
    this.viewChooseBussinessAndCategory = true;
    // this.CategorySer.getAllCategory().subscribe(suc => { this.arrCategory =[];this.arrCategory =suc;
    //   this.arrCategory.forEach(element => {
    //     if (element.CategoryCode == Number(this.category)) {
    //       this.category = element.CategoryName;
    //       return false;
    //     }
    //   });
    //   console.log(this.category + " " + this.business)


    // }, err => { alert("errrrrror category"); console.log(err); });


  }


  ngOnInit() {
    this.CategorySer.getAllCategory().subscribe(suc => { this.arrCategory = suc; }, err => { alert("errrrrror category"); console.log(err); });
    this.BusinessSer.getAllBusniess().subscribe(suc => {
      this.arrAllBusiness = suc; if (this.model.title != "") { this.getDataToShow() }
    }, err => { alert("eror get all businnes"); console.log(err); });
    if (!this.model) {
      this.model = new AxiomSchedulerEvent('', new Date(Date.now()), new Date(Date.now()), {});
    }
    if (this.model.from) {
      var from = moment(this.model.from);
      this.fromTime = from.format('HH:mm');
    }
    if (this.model.to) {
      var to = moment(this.model.to);
      this.toTime = to.format('HH:mm');
    }
    //
    this.form = new FormGroup({
      subject: new FormControl("", Validators.required),
      taskTime: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      business: new FormControl("", Validators.required),
      note: new FormControl(""),
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
      description: new FormControl(""),
      color: new FormControl("")
    })
  }
  showGroup() {
    this.group = true;
    this.viewChooseBussinessAndCategory = false;
  }

  onSelectedCategory(event) {
    this.BusinessSer.getBusinessByCategoryCode(event).subscribe(suc => { this.arrBusiness = suc; this.viewBusiness = true, this.selectedCategory = event; }, err => { alert("error to load a business list"); console.log(err); });
  }
  onKey(event) {
    this.inputValue = event.target.value;
  }

  checkHours(date: Date, hour, bussinesCode: number) {
    // this.dateInString=date;

    for (let x of ALL_SCHEDULER) {
      var d = new Date(x.EventDate);
      if (d.getDate() == date.getDate()) {
        if (x.Hour == hour) {
          return x;
        }
        if (x.Hour.toString().slice(0, 2) == hour.toString().slice(0, 2)) {
          this.beforeHour = x.Hour;
          for (let b of this.arrAllBusiness) {//pass all businesses
            if (Number(bussinesCode) == b.BusinessCode && this.cnt1 == 0) {
              this.currentB = b.FullAddress;//save current location address
              this.cnt1 = 1;
            }
            if (x.BusinessCode == b.BusinessCode && this.cnt2 == 0) {
              this.beforeB = b.FullAddress;//save before location address
              this.cnt2 = 1;
            }

          }

        }
      }
    }

    return null;
  }

  checkDistance() {
    if (!(this.cnt1 != 0 && this.cnt2 != 0))
      return null;
    if (this.beforeB != this.currentB) {
      return new Promise(resolve => {
        this.distanceSer.calcDistance(new distance(this.beforeB, this.currentB)).subscribe(suc => {
          console.log(suc)
          this.resultDistance = suc;
          resolve(suc)
        }, err => { console.log("errror get distance") });

      })
    }
    //if we return resultDistance- it's undefined


  }
  // checkHoursOfBusiness(date)
  // {
  //   var day=date.getDay();
  //   console.log(day)
  // for(let x of this.openHourArr)
  // {
  //   if(x.DayInWeek==day)
  //   {

  //   }
  // }

  // }
  checking() {
    //********************************CHECKING**************************** */
    var resultHour = this.checkHours(this.model.from, this.newSchedule.Hour, this.newSchedule.BusinessCode); //send to function
    if (resultHour != null) {

      this.title = "יש לך עוד מטלה בשעה זו בתאריך הנבחר : ";
      this.subject = resultHour.Subject + " בשעה " + resultHour.Hour;
      alert(this.title + " " + this.subject)
      // this.openModal();
    }
    this.checkDistance().then(
      res => {
        if (res != null) {

          for (let c of this.arrCategory) {
            if (c.CategoryCode == this.selectedCategory) {
              this.timeTask = c.AverageDuration;
              break;
            }
          }
        }


        // var num = this.timeDriving;
        // var hours = (num / 60);
        // var rhours = Math.floor(hours);
        // var minutes = (hours - rhours) * 60;
        // var rminutes = Math.round(minutes);
        // this.hourArriving={hours:Number(this.beforeHour.slice(0,2))+rhours,minutes:Number(this.beforeHour.slice(3,5))+rminutes};
        // console.log(this.hourArriving)
        // if(String(this.hourArriving)==this.newSchedule.Hour)
        // {
        //   console.log("ok")
        // }
        // var hourArrivingVar=this.hourArriving.hours+":"+this.hourArriving.minutes;
        var myDAte = new Date()
        myDAte.setHours(Number(this.newSchedule.Hour.slice(0, 2)));
        myDAte.setMinutes(Number(this.newSchedule.Hour.slice(3, 5)));
        var old = new Date();
        old.setHours(Number(this.beforeHour.slice(0, 2)));
        old.setMinutes(Number(this.beforeHour.slice(3, 5)));
        var duration = Math.abs(Math.floor((myDAte.valueOf() - old.valueOf()) / 60000) / 60);
        console.log(duration)
        var hours = this.timeTask / 60
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        this.title = "שים לב!";
        // this.subject = "קבעת מטלה לשעה : " +
        //   this.newSchedule.Hour + " זמן הנסיעה המשוער הוא: "
        //   + res + " הזמן הממוצע לביצוע המטלה : " + rhours + "שעות " + "ו " + rminutes + " דק' "
        // "  והפרש השעות בין המטלות הוא: " + duration * 60 + "דק' ";
        this.subject="ישלך מטלה נוספת בשעה: "+this.beforeHour+" זמן הסיעה המשוער הוא: "+res+"דק' "+
        " הזמן הממוצע לביצוע המטלה הוא: "+rhours + "שעות " + "ו " + rminutes + " דק' "+
        "וקבעת מטלה לשעה: "+this.newSchedule.Hour;
        // this.title = "שים לב!";
        // this.subject = "קבעת מטלה לשעה : " +
        //  this.newSchedule.Hour + " זמן הנסיעה המשוער הוא:  " 
        //  + res + " הזמן הממוצע לביצוע המטלה: " + this.timeTask / 60 +
        //   "  והפרש השעות הוא: " + duration * 60;
        // this.openModal();
        alert(this.title+" "+this.subject);
      });



  }

  refreshEventArr() {
    var eventCode = sessionStorage.getItem("EventCode");
    this.ScheduleSer.getAllScheduleByEventCode(Number(eventCode)).subscribe(suc => {
      this.allScheduletoRefresh = suc;
      this.events = []
      SAMPLE_EVENTS.splice(0, SAMPLE_EVENTS.length);
      ALL_SCHEDULER.splice(0, ALL_SCHEDULER.length);
      this.allScheduletoRefresh.forEach(element => {
        ALL_SCHEDULER.push(element)
        if (element.Done) { this.ezerAx.color = "gray"; }
        else { this.ezerAx.color = "rgb(210 181 181)"; }
        this.ezerAx.title = element.Subject;
        var d = new Date(element.EventDate);
        d.setHours(Number(element.Hour.toString().slice(0, 2)));
        d.setMinutes(Number(element.Hour.toString().slice(3, 5)));
        this.ezerAx.from = d;
        this.ezerAx.locked = false;
        this.ezerAx.to = d;
        this.ezerAx.data = { id: element.ScheduleId, title: element.Subject }
        this.events.push(this.ezerAx);
        SAMPLE_EVENTS.push(this.ezerAx)
        //initializing the model
        this.ezerAx = new AxiomSchedulerEvent();
      });
    }, err => { console.log("error get list") })


  }
  // 
  save(isNotClose = false) {
    //schedule id
    this.ScheduleSer.getLastScheduleId().subscribe(suc => { this.lastID = Number(suc), this.newSchedule.ScheduleId = String(this.lastID + 1); }
      , err => { console.log("error to get last schedule id") });
    // this.checkHoursOfBusiness(this.model.from);

    if (this.fromTime) {
      //check if id exist to edit
      var idToSet;
      for (var element of SAMPLE_EVENTS) {
        if (element.data.id == this.model.data.id) {
          idToSet = element.data.id;
          break;
        }
      }
      var fromSplitted = this.fromTime.split(':');
      var addTime = new Date(this.model.from);
      addTime.setHours(+fromSplitted[0]);
      addTime.setMinutes(+fromSplitted[1]);
      //addTime.setSeconds(+fromSplitted[2]);
      this.model.from = addTime;
      this.model.color = "rgb(210 181 181)";
      this.model.reOpen = isNotClose;
      // ************************************SAVE ON DB***************************************
      //save date
      this.newSchedule.EventDate = this.model.from;
      //save time 
      this.newSchedule.Hour = this.fromTime;
      //save subject
      this.newSchedule.Subject = this.model.title;
      //save eventCode
      this.userCode = Number(sessionStorage.getItem("UserCode"));
      this.EventSer.getEventByUserCode(this.userCode).subscribe(suc => {
        this.currentEvent = suc, this.newSchedule.EventCode = this.currentEvent.EventCode;
        //save description
        this.newSchedule.Description = this.inputValue;
        //add to DB
        //update AxiomSchedulerEvent data
        this.model.data = { id: this.newSchedule.ScheduleId, title: this.model.title }
        //business
        console.log(this.newSchedule)
        //edit
        if (idToSet) {
          this.newSchedule.ScheduleId = idToSet;
          var index = ALL_SCHEDULER.findIndex(e => e.ScheduleId == this.model.data.id)
          if (index > -1) {
            ALL_SCHEDULER[index] = this.newSchedule;
            // this.refreshView();
          }
        }
        this.ScheduleSer.newSchedule(this.newSchedule).subscribe(suc => {
          console.log("success to add schedule")
          //add
          if (!idToSet) {
            //add AxiomSchedulerEvent array 
            SAMPLE_EVENTS.push(this.model);
            //add schdule array
            ALL_SCHEDULER.push(this.newSchedule)
            this.refreshEventArr();
          }
        },
          err => { console.log("error to add schedule") });
      },
        err => { alert("errrrrror get event"); console.log(err); });
    }
    if (this.toTime) {
      var fromSplitted = this.toTime.split(':');
      var addTime = new Date(this.model.to);
      addTime.setHours(+fromSplitted[0]);
      addTime.setMinutes(+fromSplitted[1]);
      //addTime.setSeconds(+fromSplitted[2]);
      this.model.to = addTime;
    }
    this.model.data.title = this.model.title;
    this.model.to = this.model.from;
    // if (!isNotClose) { 
    this.modal.close(this.model);
    this.checking();
    // }
    // else{
    //   this.newSchedule.BusinessCode = null;
    //   this.newSchedule.Description = this.inputValue;
    //   this.newSchedule.Hour = "";
    // }
    // }
  }
  clearFields() {
    this.nextSchedule = true;
    this.save(true);

  }
  viewBusinessDetailsFunc(event) {
    this.viewBusinessDetails = true;
    for (let b of this.arrBusiness) {
      if (event == b.BusinessCode) {
        this.currentBusiness = b;
        this.OpenHourSer.getHoursByBusinessCode(b.BusinessCode).subscribe(suc => { this.openHourArr = suc; }, err => { console.log("error get opening hour") });

      }
    }
  }
  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
}