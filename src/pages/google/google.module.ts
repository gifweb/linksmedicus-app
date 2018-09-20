import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GooglePage } from './google';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    GooglePage,
  ],
  imports: [
    IonicPageModule.forChild(GooglePage),
    ComponentsModule,
    PipesModule,
  ],
})
export class GooglePageModule { }
