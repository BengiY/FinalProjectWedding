import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbDateAdapter, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { EventWindowComponent } from './components/event-window/event-window.component';
import { DateNativeAdapter } from './dateAdapter';
import { NgbTimeStringAdapter } from './timeAdapter';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { DatePipe } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { SliderModule } from 'angular-image-slider';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { BusinessOwnersComponent } from './components/business-owners/business-owners.component';
import { StatisticsComponent } from './components/statistics/statistics.component'
import { ChartModule, SparklineModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { ChartsModule } from 'ng2-charts';
import { Routes,RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { AxiomSchedulerModule } from 'axiom-scheduler';

import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDescriptionComponent,
    EventWindowComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    FormTaskComponent,
    BusinessOwnersComponent,
    StatisticsComponent,
  ],

  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    SliderModule,
    MatRadioModule,
    BrowserModule,
    AppRoutingModule,
    
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AxiomSchedulerModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    NgbModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 12
        },
        vertical: {
          position: 'bottom',
          distance: 12
        }
      },
      theme: 'material'
    }),
    ChartModule, SparklineModule,
    BrowserAnimationsModule,
    RouterModule,
    ChartsModule

  ],

  providers: [
    { provide: NgbDateAdapter, useClass: DateNativeAdapter },
    { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EventWindowComponent
  ]
})
export class AppModule { }
