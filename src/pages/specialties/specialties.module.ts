import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecialtiesPage } from './specialties';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SpecialtiesPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecialtiesPage),
    ComponentsModule,
  ],
})
export class SpecialtiesPageModule {}
