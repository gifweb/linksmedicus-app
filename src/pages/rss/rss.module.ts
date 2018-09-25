import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RssPage } from './rss';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RssPage,
  ],
  imports: [
    IonicPageModule.forChild(RssPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class RssPageModule {}
