import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppHeaderComponent } from './app-header/app-header';
import { SelectTopicComponent } from './select-topic/select-topic';
import { OpenAccessComponent } from './open-access/open-access';
import { GtranslateSelectComponent } from './gtranslate-select/gtranslate-select';
import { PipesModule } from '../pipes/pipes.module';
import { AppFooterComponent } from './app-footer/app-footer';

@NgModule({
    declarations: [
        AppHeaderComponent,
        SelectTopicComponent,
        OpenAccessComponent,
        GtranslateSelectComponent,
    AppFooterComponent,
    ],
    imports: [
        IonicPageModule.forChild(AppHeaderComponent),
        IonicPageModule.forChild(SelectTopicComponent),
        IonicPageModule.forChild(OpenAccessComponent),
        IonicPageModule.forChild(GtranslateSelectComponent),
        PipesModule,
    ],
    exports: [
        AppHeaderComponent,
        SelectTopicComponent,
        OpenAccessComponent,
        GtranslateSelectComponent,
    AppFooterComponent,
    ]
})
export class ComponentsModule { }
