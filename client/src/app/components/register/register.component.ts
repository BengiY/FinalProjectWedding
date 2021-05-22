import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { event } from 'src/app/class/event';
import { user } from 'src/app/class/user';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userNow: string;
  title: string;

  constructor(public UserSer: UserService, public router: Router, public EventSer: EventService) { }
  registerUser: user = new user();
  returnValue: user;
  eventToAdd: event = new event();
  form;

  handleChange(event) {
    if (event == "groom") {
      this.registerUser.UserType = false;
      this.eventToAdd.GroomOrBride=false;
    }
    if (event == "bride") {
      this.registerUser.UserType = true;
      this.eventToAdd.GroomOrBride=true;
    }
    console.log(this.registerUser.UserType)
  }

  registerClick() {
    debugger
    this.display = "block";
    if(this.form.$valid)
    this.eventToAdd.GroomOrBride = this.registerUser.UserType;
    this.UserSer.NewUser(this.registerUser).subscribe(suc => {
      this.returnValue = suc;
      this.eventToAdd.UserCode = this.returnValue.UserCode;
      this.userNow=this.returnValue.UserName;
      this.title="פרטיך נקלטו בהצלחה";
      // this.registerUser.UserLastName = "";
      // this.registerUser.UserMail = "";
      // this.registerUser.UserName = "";
      // this.registerUser.UserPassword = null;
      this.EventSer.newEvent(this.eventToAdd).subscribe(succ => { console.log("success to add event"); console.log(succ, "+" ,this.eventToAdd) },
      err => { console.log(this.eventToAdd),console.log("error to add event") });
  

    }, err => { console.log("error to register"); console.log(err); });


    console.log(this.eventToAdd)
  }

  ngOnInit() {
    this.form = new FormGroup({
      FirstNameF: new FormControl("", Validators.required),
      LastNameF: new FormControl("", Validators.required),
      EmailF:new FormControl("", Validators.compose(
        [Validators.required,
        Validators.email])),
        PasswordF: new FormControl("",  Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
       ])),
        DateF: new FormControl("", Validators.required),
    })
  }
  display = "none";

  openModal() {
      this.display = "block";
    }
    onCloseHandled() {
      this.display = "none";
      this.router.navigate(['/login']);
    }
}