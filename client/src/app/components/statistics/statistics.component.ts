import { Component, OnInit } from '@angular/core';
import { business } from 'src/app/class/business';
import { event } from 'src/app/class/event';
import { schedule } from 'src/app/class/schedule';
import { BusinessService } from 'src/app/services/business.service';
import { EventService } from 'src/app/services/event.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { statistic } from 'src/app/class/statistic';
import { StatisticsService } from 'src/app/services/statistics.service';
import { category } from 'src/app/class/category';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  bussinesArr: business[] = [];
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  userCode: number;
  statisticsArr: statistic[] = [];
  ViewLoginOrRegister: boolean = false;
  showMessage: boolean = false;
  constructor(public statisticSer: StatisticsService) { }

  pushFunction() {
    for (let s of this.statisticsArr) {
      this.pieChartLabels.push(s.CategoryName);
      this.pieChartData.push(s.Data);
    }
  }

  ngOnInit() {
    this.userCode = Number(sessionStorage.getItem("UserCode"));
    if (this.userCode != 0) {
      this.statisticSer.getTimeAvgByCategory(this.userCode).subscribe(suc => {
        this.statisticsArr = suc;
        if (this.statisticsArr.length == 0) {
          this.showMessage = true;
        }
        else {
          this.pushFunction();
        }

      }, err => { console.log("error get statistics list") })
    }
    else {
      this.ViewLoginOrRegister = true;
      this.openModal();
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



