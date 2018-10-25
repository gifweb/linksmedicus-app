import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultsPage } from './search-results';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultsPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class SearchResultsPageModule { }
