import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibraryPage } from './library';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LibraryPage,
  ],
  imports: [
    IonicPageModule.forChild(LibraryPage),
    ComponentsModule
  ],
})
export class LibraryPageModule {}
