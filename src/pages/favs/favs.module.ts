import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavsPage } from './favs';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FavsPage,
  ],
  imports: [
    IonicPageModule.forChild(FavsPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class FavsPageModule {}
