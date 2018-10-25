import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-guidelines-popover',
  template: `
  <ion-list>
      <ion-item *ngFor="let topic of topics" text-wrap (click)="close(topic.id)">{{topic.title}}</ion-item>
    </ion-list>
  `,
  styles: [
    `
      .item { color: #156e8b }
    `
  ]
})
export class GuidelinesPopoverPage {

  topics: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.topics = this.navParams.get('topics');
  }

  close(topicId) {
    this.viewCtrl.dismiss(topicId);
  }

}
