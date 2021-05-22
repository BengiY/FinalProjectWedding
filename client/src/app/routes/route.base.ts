import { SAMPLE_EVENTS } from 'src/app/sample-events';
import { EventWindowComponent } from 'src/app/components/event-window/event-window.component';
import { Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AxiomSchedulerEvent } from 'axiom-scheduler';
import { ScheduleService } from '../services/schedule.service';
import { schedule } from '../class/schedule';


export class RouteBaseClass {

    public _modalService: NgbModal;
    schedulelist: schedule[] = [];
    public events = [...SAMPLE_EVENTS];
    ezerAx: AxiomSchedulerEvent = new AxiomSchedulerEvent();
    constructor(protected injector: Injector, public ScheduleSer: ScheduleService) {
        this._modalService = this.injector.get(NgbModal);
    }

    public editEvent($event: AxiomSchedulerEvent = null): void {
        var instance = this._modalService.open(EventWindowComponent, { size: 'sm', centered: true });
        if ($event) {
            instance.componentInstance.model = { ...$event }
        }
        instance.result.then((model) => {
            if (model) {
                // var eventCode = sessionStorage.getItem("EventCode");
                // this.ScheduleSer.getAllScheduleByEventCode(Number(eventCode)).subscribe(suc => {
                //     this.schedulelist = suc;
                //     console.log(this.events);
                //     this.schedulelist.forEach(element => {
                //         this.ezerAx.title = element.Subject;
                //         var d = new Date(element.EventDate);
                //         d.setHours(Number(element.Hour.toString().slice(0, 2)));
                //         d.setMinutes(Number(element.Hour.toString().slice(3, 5)));
                //         this.ezerAx.from = d;
                //         this.ezerAx.locked = false;
                //         this.ezerAx.to = d;
                //         this.ezerAx.data = { id: element.ScheduleId, title: element.Subject }
                //         this.events.push(this.ezerAx);
                //         this.refreshView();

                //     });
                //     this.events[this.events.length-2]=model;
                //     this.events.pop()
                //     this.refreshView();
                // }, err => { console.log("error from route base") });

                if ($event) {
                    var index = this.events.findIndex(e => e._id === $event._id);
                    if (index > -1) {
                        this.events[index] = model;

                    }

                }
                else {
                    this.events.push(model);
                }
                if (model.reOpen)
                    this.editEvent();
                else
                    this.refreshView();

            }
        });
    }

    public removeEvent($event: AxiomSchedulerEvent): void {
        var index = this.events.findIndex(e => e._id === $event._id);
        if (index > -1) {
            this.events.splice(index, 1);
            this.refreshView();
        }
    }

    public refreshView(): void { }

}