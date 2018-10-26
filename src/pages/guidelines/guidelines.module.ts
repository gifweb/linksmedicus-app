import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidelinesPage } from './guidelines';
import { IonAffixModule } from 'ion-affix'
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    GuidelinesPage,
  ],
  imports: [
    IonAffixModule,
    IonicPageModule.forChild(GuidelinesPage),
    ComponentsModule,
    PipesModule,

  ],
  
})
export class GuidelinesPageModule {}
