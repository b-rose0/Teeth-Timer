import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page} from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TimerPipe } from './timerPipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, TimerPipe]
})
export class Tab1PageModule {}
