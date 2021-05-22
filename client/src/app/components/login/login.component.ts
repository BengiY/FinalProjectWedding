import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { BusinessService } from 'src/app/services/business.service';
import { EventService } from 'src/app/services/event.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/class/user';
import { distance } from 'src/app/class/distance';
import { MatFormFieldModule } from '@angular/material/form-field';


// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { AxiomSchedulerEvent } from 'axiom-scheduler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNow: string;
  // public model: AxiomSchedulerEvent;

  //public modal: NgbActiveModal,
  constructor(public GoogleSer: GoogleMapsService, public UserSer: UserService, public EventSer: EventService, public BusniessSer: BusinessService, public router: Router) { }
  eventCode: number;
  getUser: user = new user();
  returnValue: user = new user();
  form;
  // one:string="13:00:00";
  // two:string="14:30:00";
  // onev:Date;
  // twov:Date;
  loginClick() {
    debugger
    console.log(this.getUser.UserName + " " + this.getUser.UserPassword)
    this.UserSer.ExistUser(this.getUser).subscribe(suc => {
      this.returnValue = suc;
      console.log(suc);
      console.log(this.returnValue)
      if (this.returnValue == false) {
        this.getUser.UserPassword = null;
        this.getUser.UserName = "";
        this.openModal();
      }
      else {
        // alert("ברוכים הבאים");
        this.userNow = this.returnValue.UserName;
        this.router.navigate(['/home'])
        sessionStorage.setItem("userNow", this.returnValue.UserName);
        sessionStorage.setItem("UserType", new Boolean(this.returnValue.UserType).toString());
        sessionStorage.setItem("UserCode", this.returnValue.UserCode.toString());
        sessionStorage.setItem("userInSystem", "1");
        this.EventSer.getEventByUserCode(this.returnValue.UserCode).subscribe(suc=>
          {sessionStorage.setItem("EventCode", suc.EventCode.toString());},err=>{console.log("error get")}
        )
        this.getUser.UserPassword = null;
        this.getUser.UserName = "";


      }
    }, err => { alert("errrrrror"); console.log(err); });
    // this.modal.close(this.model);

  }
  ngOnInit(): void {

    // this.GoogleSer.calcDistance(new distance("זכריה הנביא 8 כפר סבא","שאול המלך 5 כפר סבא")).subscribe(suc=>{console.log
    // (suc)},err=>{console.log("error to calc dest")})
    this.form = new FormGroup({
      UserNameF: new FormControl("", Validators.required),
      UserPasswordF: new FormControl("", Validators.required)
    })
  }
  display = "none";
openModal() {
  this.display = "block";
}
onCloseHandled() {
  this.display = "none";
}

}

