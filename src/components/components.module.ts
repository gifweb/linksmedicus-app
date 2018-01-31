import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppHeaderComponent } from './app-header/app-header';
import { SelectTopicComponent } from './select-topic/select-topic';

@NgModule({
    declarations: [
        AppHeaderComponent,
        SelectTopicComponent,
    ],
    imports: [
        IonicPageModule.forChild(AppHeaderComponent),
        IonicPageModule.forChild(SelectTopicComponent),
    ],
    exports: [
        AppHeaderComponent,
        SelectTopicComponent,
    ]
})
export class ComponentsModule { }
