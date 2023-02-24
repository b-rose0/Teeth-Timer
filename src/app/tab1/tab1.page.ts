import { Component, OnInit, Pipe } from '@angular/core';
import { Preferences } from '@capacitor/preferences';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page{
  timerContinueGlobal : number = 0;
  timerGlobal: number = 0;
  pauseGlobal: number = -1;
  timerContinue : number = 0;
  timer: number = 0;
  pause: number = -1;
  zoneNumber: number = 0;
  numberTotalZ: number = 15;
  timeZ: number = 16;
  waitBetweenZ: number = 6;
  timerTarget: string = "mon petit marco";
  isWaiting: boolean = false;

  constructor() {}

  // ngOnInit(): void {
  //   setInterval(() => this.fonctionnementTimer(this.timer), 10)
  //   this.getSettings();
  // }

  ionViewWillEnter(){
    setInterval(() => this.fonctionnementTimer(this.timer), 10)
    this.getSettings();
    (document.getElementById('iconIsWaiting') as HTMLInputElement).hidden = true;
    (document.getElementById('iconTimerZone') as HTMLInputElement).hidden = false;
  }
  

  fonctionnementTimer(num : number) {
    this.timerContinue++;
    this.timerContinueGlobal++;
    if(this.pause == -1){
      this.timer = this.timerContinue;
      if(this.isWaiting) {
        if(this.timer>this.waitBetweenZ*100){
          this.timerContinue = 0;
          this.timer = 0;
          this.isWaiting = false;
          (document.getElementById('iconIsWaiting') as HTMLInputElement).hidden = true;
          (document.getElementById('iconTimerZone') as HTMLInputElement).hidden = false;
        }
      } else if(this.zoneNumber<this.numberTotalZ && this.timer>this.timeZ*100){
        this.zoneNumber++;
        this.timerContinue = 0;
        this.timer = 0;
        this.isWaiting = true;
        (document.getElementById('iconTimerZone') as HTMLInputElement).hidden = true;
        (document.getElementById('iconIsWaiting') as HTMLInputElement).hidden = false;
      }
    }
    if(this.pauseGlobal == -1){
      this.timerGlobal = this.timerContinueGlobal;
    }
    if(this.zoneNumber==this.numberTotalZ){
      this.pauseButton();
      this.pauseButtonGlobal();
      //disable Play
      (document.getElementById('playButtonGlobal') as HTMLInputElement).disabled = true;
      (document.getElementById('playButton') as HTMLInputElement).disabled = true;
    }
  }
  async getSettings() {
    let settings;
    const ret = await Preferences.get({ key: 'settings' });
    if(ret.value){
      settings = JSON.parse(ret.value).values;
      this.numberTotalZ = settings.numberTotalZ;
      this.timeZ = settings.timeZ;
      this.waitBetweenZ = settings.waitBetweenZ;
      this.timerTarget = settings.timerTarget;
    }
  }

  pauseButton() {
    this.pause = this.timer;
  }
  playButton() {
    if(this.pause != -1){
      this.timerContinue = this.pause;
      this.pause = -1;
    }
  }
  refreshButton() {
    this.timerContinue = 0;
    this.timer = 0;
    if(this.pause != -1){
      this.pause = 0;
    }
  }

  pauseButtonGlobal() {
    (document.getElementById('playButton') as HTMLInputElement).disabled = true;
    this.pauseGlobal = this.timerGlobal;
    this.pauseButton();
  }
  playButtonGlobal() {
    if(this.pauseGlobal != -1){
      (document.getElementById('playButton') as HTMLInputElement).disabled = false;
      this.timerContinueGlobal = this.pauseGlobal;
      this.pauseGlobal = -1;
      this.playButton();
    }
  }
  refreshButtonGlobal() {
    //renable play
    (document.getElementById('playButtonGlobal') as HTMLInputElement).disabled = false;
    (document.getElementById('iconIsWaiting') as HTMLInputElement).hidden = true;
    (document.getElementById('iconTimerZone') as HTMLInputElement).hidden = false;
    this.timerContinueGlobal = 0;
    this.timerGlobal = 0;
    if(this.pauseGlobal != -1){
      this.pauseGlobal = 0;
    }
    this.zoneNumber = 0;
    this.isWaiting = false;
    this.refreshButton();
  }


}
