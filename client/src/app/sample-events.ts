import * as moment from 'moment';
import { AxiomSchedulerEvent } from 'axiom-scheduler';

var colors = ['#673AB7', '#E91E63', '#795548', '#009688', '#03A9F4', '#FF9800', '#004D40', '#FF4081', '#00B8D4', '#795548', '#00E676', '#ff5252', '#424242', '#7E57C2', '#FFC107', '#8D6E63'];
export var ALL_SCHEDULER=[]
export var CNT=0;
export var SAMPLE_EVENTS = [
  {
    "data": {
      "id": "",
      "title": ""
    },
    "from": "",
    "to": "",
    "color": "",

    "locked":false
  },
  
].map(i => new AxiomSchedulerEvent(i.data.title, i.from && new Date(i.from), i.to && new Date(i.to), i.data, i.color, i.locked));
