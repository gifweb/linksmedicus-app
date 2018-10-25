import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsPage } from './posts';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PostsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class PostsPageModule { }
