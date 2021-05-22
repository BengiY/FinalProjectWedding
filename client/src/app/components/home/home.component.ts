import { AxiomSchedulerAnimation, AxiomSchedulerEvent } from 'axiom-scheduler';

import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { AxiomSchedulerComponent } from 'axiom-scheduler';
import { RouteBaseClass } from '../../routes/route.base';
import { ALL_SCHEDULER, CNT, SAMPLE_EVENTS } from 'src/app/sample-events';
import { EventService } from 'src/app/services/event.service';
import { event } from 'src/app/class/event';
import { ScheduleService } from 'src/app/services/schedule.service';
import { schedule } from 'src/app/class/schedule';
import { EventWindowComponent } from '../event-window/event-window.component';
import { Router } from '@angular/router';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { AxiomSchedulerModule } from 'axiom-scheduler';
import { mustList } from 'src/app/class/mustList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends RouteBaseClass implements OnInit {
  public events = [...SAMPLE_EVENTS];
  public allSchedule = [...ALL_SCHEDULER];
  // colors: string[] = ['#673AB7', '#E91E63', '#795548', '#009688', '#03A9F4', '#FF9800', '#004D40', '#FF4081', '#00B8D4', '#795548', '#00E676', '#ff5252', '#424242', '#7E57C2', '#FFC107', '#8D6E63'];
  colors: string[] = ['black', '#ff5252'];
  public model: any = {};
  public themes = ['dark', 'light'];
  public animations = Object.values(AxiomSchedulerAnimation);
  ev: AxiomSchedulerEvent = new AxiomSchedulerEvent("my private event", new Date(Date.now()), new Date(Date.now()), "asg", "red", false)
  userNow: string;
  userCode: number;
  eventCode: event;
  ezerAx: AxiomSchedulerEvent = new AxiomSchedulerEvent();
  scheduleList: schedule[] = [];
  scheduleListAx: AxiomSchedulerEvent[] = [];
  lastScheduleId: string;
  public cnt = CNT;
  lastID: number;
  title: string;
  subject: string;
  viewNavigation: boolean = false;
  mustList: mustList[] = [];

  @ViewChild(AxiomSchedulerComponent) scheduler: AxiomSchedulerComponent;
  userinSystem: string;
  next: string;
  viewLogin: boolean = true;
  viewName: boolean = false;
  logOut: boolean = false;
  mustArr: string[] = [];

  text: string;
  refreshSchedule: boolean = false;
  info: string;
  constructor(public router: Router, injector: Injector, public EventSer: EventService, public ScheduleSer: ScheduleService) {
    super(injector, ScheduleSer);
  }
  // refrashScheduleList()
  // {
  //   // this.allSchedule=[];
  //   // this.events=[];
  //   // // this.refreshSchedule=true;
  //   // this.cloneListSchedule();
  //   this.refreshView();
  // }
  cloneListSchedule() {
    this.userCode = Number(sessionStorage.getItem("UserCode"));
    this.EventSer.getEventByUserCode(this.userCode).subscribe(suc => {
      this.eventCode = suc,
        this.ScheduleSer.getAllScheduleByEventCode(this.eventCode.EventCode).subscribe(suc => {
          this.scheduleList = suc,
            this.scheduleList.forEach(element => {
              //list with my objects
              ALL_SCHEDULER.push(element);
              //create AxiomSchedulerEvent
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
              //list schedule of AxiomSchedulerEvent
              SAMPLE_EVENTS.push(this.ezerAx);
              //for visual on calendar
              this.events.push(this.ezerAx);
              //initializing the model
              this.ezerAx = new AxiomSchedulerEvent();
            });
          console.log("our")
          console.log(ALL_SCHEDULER)
          console.log("them")
          console.log(this.events)
        },

          err => { console.log("error get schedule list") })
    }, err => { console.log("error get event code") })
  }
  ngOnInit() {
    this.userNow = sessionStorage.getItem("userNow");
    var typeyu = sessionStorage.getItem("UserType")
    if (typeyu == "false")
      this.mustArr = ["מגבעות", "חליפות והלבשה", "הדרכת חתנים"]
    else
      this.mustArr = ["מסרקות", "מאפרות", "הדרכת כלות"]
    if (this.userNow == null) {
      this.userNow = "אינך מחובר";
      this.text = "לחץ להתחברות";
      // this.viewLogin=false;
      // this.viewName=true;
      this.openModal();
      this.title = "אינך מחובר";
      this.subject = "על מנת לצפות בלוח הזמנים האישי שלך יש לבחור באחת משני האופציות הבאות:"
      this.viewNavigation = true;
    }
    else {
      var uType = sessionStorage.getItem("UserType");
      // this.ScheduleSer.getmustList(uType).subscribe(suc=>{this.mustList=suc;
      this.text = "התנתק/י";
      var showdialog = sessionStorage.getItem("showDialog");
      if (showdialog != "1") {
        this.openModal();
        this.title = "ברוכים הבאים";
        this.subject = "כעת ניתן לצפות לערוך או למחוק מטלות שנקבעו בלוח הזמנים";
        this.info = " שים לב ששיבצת בלו'ח הזמנים שלך מטלות עם עסקים מקטגוריות חובה:";
        sessionStorage.setItem("showDialog", "1");
      }
      // },err=>{console.log("error get must list")})
    }
    this.userinSystem = sessionStorage.getItem("userInSystem");
    // this.next = sessionStorage.getItem("next");
    // // if(this.next=="1")
    // // {
    //   this._modalService.open(EventWindowComponent, { size: 'sm', centered: true });
    //   sessionStorage.setItem("next","0");
    // // }
    //refresh schedule array just if someone logged
    if (this.events.length <= 1 && this.title != "אינך מחובר") {
      // this.ScheduleSer.getLastScheduleId().subscribe(suc => { this.lastScheduleId = suc, this.lastID = Number(suc) }, err => { console.log("error to get last schedule id") })
      this.cloneListSchedule();
      sessionStorage.setItem("userInSystem", "0");
    }
    this.model.step = 5;
    this.model.toolbar = true;
    this.model.eventTemplate = true;
    this.model.theme = 'light';
    this.model.locale = true;
    // this.model.AxiomSchedulerView="Month"
    this.model.animation = AxiomSchedulerAnimation.Default;


  }

  refreshView(): void {
    this.scheduler.refreshScheduler();
  }
  display = "none";
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    // if (this.logOut) {
    //   sessionStorage.setItem("userNow",null);
    //   sessionStorage.setItem("UserType",null);
    //   sessionStorage.setItem("UserCode",null);
    //   this.userNow = "אינך מחובר";
    // }
    this.display = "none";
  }

  logout() {
    if (this.userNow != "אינך מחובר") {
      // this.title = "האם אתה מעוניין  לצאת?";
      // this.subject = "יתכן שחלק מהשינויים לא ישמרו";
      // this.logOut = true;
      sessionStorage.removeItem("userNow");
      sessionStorage.removeItem("UserType");
      sessionStorage.removeItem("UserCode");
      this.text = "לחץ להתחברות";
      // this. openModal();
    }

  }
}
