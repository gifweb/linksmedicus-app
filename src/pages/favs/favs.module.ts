import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavsPage } from './favs';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FavsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavsPage),
    ComponentsModule,
  ],
})
export class FavsPageModule {}
