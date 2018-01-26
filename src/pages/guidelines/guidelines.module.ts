import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidelinesPage } from './guidelines';
import { IonAffixModule } from 'ion-affix'

@NgModule({
  declarations: [
    GuidelinesPage,
  ],
  imports: [
    IonAffixModule,
    IonicPageModule.forChild(GuidelinesPage),
  ],
})
export class GuidelinesPageModule {}
