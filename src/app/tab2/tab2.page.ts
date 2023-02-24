import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  settingsForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    public alerCtrl: AlertController,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      numberTotalZ: new FormControl(15, Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(30),
        Validators.pattern(/^[0-9]\d*$/)
      ])),
      timeZ: new FormControl(16, Validators.compose([
        Validators.required,
        Validators.min(10),
        Validators.max(60)
      ])),
      waitBetweenZ: new FormControl(6,  Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(30)
      ])),
      timerTarget: new FormControl("mon petit marco", Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])),
    });

    this.getSettings();
  }
  async getSettings() {
    let settings;
    const ret = await Preferences.get({ key: 'settings' });
    if(ret.value){
      settings = JSON.parse(ret.value).values;
      this.settingsForm.controls["numberTotalZ"].setValue(settings.numberTotalZ);
      this.settingsForm.controls["timeZ"].setValue(settings.timeZ);
      this.settingsForm.controls["waitBetweenZ"].setValue(settings.waitBetweenZ);
      this.settingsForm.controls["timerTarget"].setValue(settings.timerTarget);
    }
  }
  validation_messages = {
    'numberTotalZ': [
      { type: 'required', message: 'Le nombre de zones est requis.'},
      { type: 'min', message: 'Le nombre de zones doit être supérieur à 0.'},
      { type: 'max', message: 'Le nombre de zones doit être inférieur à 30 zones.'},
      { type: 'pattern', message: 'Veuillez rentrer un nombre'},
    ],
    'timeZ': [
      { type: 'required', message: 'Le temps pour le brossage de chaque zone est requis.'},
      { type: 'min', message: 'Le temps de brossage doit être supérieur à 9s.'},
      { type: 'max', message: 'Le temps de brossage doit être inférieur à 60s.'},
    ],
    'waitBetweenZ': [
      { type: 'required', message: "Le temps d'attente entre zones est requis."},
      { type: 'min', message: "Le temps d'attente doit être positif."},
      { type: 'max', message: "Le temps d'attente doit être inférieur à 30s."},
    ],
    'timerTarget': [
      { type: 'required', message: 'La cible du Timer est requis.'},
      { type: 'maxLength', message: 'Texte trog long, il doit être, au plus, de 20 charactères.'},
    ],
  }

  async doConfirm(values: any) {
    let confirm = await this.alerCtrl.create({
      header: 'Save settings',
      message: 'Voulez vous sauvegarder ces paramètres ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Save settings: disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.saveSettings(values);
            this.router.navigateByUrl("/tabs");
          }
        }
      ]
    });
    confirm.present();
  }

  async saveSettings(values: any){
    console.log(values);
    await Preferences.set({
      key: 'settings',
      value : JSON.stringify({
        values
      })
    });
  }

  incrementNumberZone() {
    const currentValue = this.settingsForm.controls["numberTotalZ"].getRawValue();
    this.settingsForm.controls["numberTotalZ"].setValue(parseInt(currentValue)+1);
  }
  decrementNumberZone() {
    const currentValue = this.settingsForm.controls["numberTotalZ"].getRawValue();
    this.settingsForm.controls["numberTotalZ"].setValue(parseInt(currentValue)-1);
    
  }
}
