import { Pipe } from '@angular/core';

@Pipe({name:"timer"})
export class TimerPipe {
  transform(value: number) {
    if(value>359999){
      return "59:59:99";
    } else {
      let ms;
      let minutes;
      if(value<6000){
        minutes = 0;
        ms = value;
      } else {
        minutes = Math.trunc(value/6000);
        ms = value%6000;
      }
      let timerM = "";
      if(minutes<10){
        timerM ='0'+ minutes + ':';
      } else {
        timerM = minutes + ':';
      }
      let timerMs: string[];
        timerMs = ('0'.repeat(4-ms.toString().length) + ms).split('');
        return timerM+timerMs[0]+timerMs[1]+':'+timerMs[2]+timerMs[3];
    }
    
  }
}