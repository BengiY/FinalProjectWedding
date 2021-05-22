import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { business } from 'src/app/class/business';
import { openHour } from 'src/app/class/openHour';

import { category } from 'src/app/class/category';
import { BusinessService } from 'src/app/services/business.service';
import { CategoryService } from 'src/app/services/category.service';
import { OpeningHourService } from 'src/app/services/opening-hour.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-business-owners',
  templateUrl: './business-owners.component.html',
  styleUrls: ['./business-owners.component.scss']
})
export class BusinessOwnersComponent implements OnInit {
  newBusiness: business = new business();
  newOpenBusiness: openHour = new openHour();
  arrCategory: category[] = [];
  arrBusiness: business[] = [];
  inputValue: string;
  viewAdd: boolean = false;
  viewEdit: boolean = false;
  form;
  businessCodeToSet: string;
  daysArr: string[] = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"]
  openingHourArr: openHour[] = [];
  start: Time;
  end: Time;
  myForm;
  showHour: boolean = false;
  businessInSQL: business;
  businessListToset: business[] = [];
  constructor(public businessSer: BusinessService, public CategorySer: CategoryService, public HourSer:OpeningHourService) { }

  ngOnInit() {
    this.form = new FormGroup({
      BusinessOwnerCodeF: new FormControl("", Validators.required),
      BusinessNameF: new FormControl("", Validators.required),
      FullAddressF: new FormControl("", Validators.required),
      PhoneF: new FormControl("", Validators.required),
      BusinessDescriptionF: new FormControl("", Validators.required),
      startF: new FormControl("", Validators.required),
      endF: new FormControl("", Validators.required), 
      businessCodeToSetF :new FormControl("", Validators.required),
    })
    this.CategorySer.getAllCategory().subscribe(suc => { this.arrCategory = suc; }, err => { alert("errrrrror category"); console.log(err); });
  }
  onKey(event) {
    this.inputValue = event.target.value;
  }
  onSelectedCategory(event) {
    this.newBusiness.CategoryCode = event;
  }
  addBusiness() {
    this.newBusiness.BusinessDescription = this.inputValue;
    console.log(this.newBusiness);
    this.businessSer.newBusiness(this.newBusiness).subscribe(suc => { console.log(suc), this.openModal(), this.showHour=true; this.businessInSQL=suc; }, err => { alert("error to load a business list"); console.log(err); });
  }
  viewAddFunction() {
    if (this.viewAdd) {
      this.viewAdd = false;
    }
    else {
      this.viewAdd = true;
    }
    if (this.viewEdit) {
      this.viewEdit = false
    }
  }
  viewEditFunction() {
    if (this.viewEdit) {

      this.viewEdit = false;
    }
    else {
      this.viewEdit = true;
    }
    if (this.viewAdd) {
      this.viewAdd = false;
    }
  }
  getBussinessByOwnerCode()
  {
    this.businessSer.getBussinessByOwnerCode(this.businessCodeToSet).subscribe(suc=>{this.businessListToset=suc;console.log(suc)},err=>{alert("העסק לא קיים במערכת")})
  }
  addDay(x)
  {
    this.openingHourArr.push(new openHour(0,this.businessInSQL.BusinessCode,x,this.start,this.end))
    console.log(this.openingHourArr)
    this.start=undefined;
    this.end=undefined;
  }
  addHours()
  {
    for(let x of this.openingHourArr)
    {
      console.log(x.DayInWeek+" "+x.StartHour+ " "+ x.EndHour)
    }
    this.HourSer.newHours(this.openingHourArr).subscribe(suc=>{alert("השעות נוספו בהצלחה")},err=>{alert("error hour")});
    this.openingHourArr=[];
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
}
