import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinksPage } from './links';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LinksPage,
  ],
  imports: [
    IonicPageModule.forChild(LinksPage),
    ComponentsModule,
  ],
})
export class LinksPageModule {}
