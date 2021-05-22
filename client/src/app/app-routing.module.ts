
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { FormTaskComponent } from './components/form-task/form-task.component';
import { BusinessOwnersComponent } from './components/business-owners/business-owners.component';
import { EventWindowComponent } from './components/event-window/event-window.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';




const routes: Routes = [
  { path : 'home' , component : HomeComponent },
  { path : 'events' , component : EventDescriptionComponent },
  { path : 'login' , component : LoginComponent },
  { path : 'about' , component : AboutComponent },
  { path : 'register' , component : RegisterComponent },
  { path : 'form-task' , component : FormTaskComponent },
  { path : 'business-owners' , component : BusinessOwnersComponent },
  { path : 'statistics' , component :StatisticsComponent  },

  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    ChartsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
