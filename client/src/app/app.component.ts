import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { SAMPLE_EVENTS } from './sample-events';
import { AxiomSchedulerComponent, AxiomSchedulerEvent } from 'axiom-scheduler';
import { RouteBaseClass } from './routes/route.base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(AxiomSchedulerComponent) scheduler: AxiomSchedulerComponent;
  events  = [...SAMPLE_EVENTS];
  events2 = [...SAMPLE_EVENTS];
  userNow: string;
  viewLogin: boolean=true;
  viewName: boolean=false;

    ngOnInit(): void {
      this.userNow = sessionStorage.getItem("userNow");
      if (this.userNow != null) 
      {
        this.viewLogin=false;
        this.viewName=true;
      }
  }
  checkNavigate(){
    if(this.userNow!=null)
    {
      alert("האם אתה מעוניין לצאת?")
    }
  }

}
