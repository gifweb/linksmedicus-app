import { Component, Input, EventEmitter, Output } from '@angular/core';
import {  NavController } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() action: string = 'search';
  @Output() shareAction = new EventEmitter();

  constructor(
    private navCtrl: NavController,
  ) {

  }

  toggleRightMenu() {
    this.navCtrl.push('SearchPage');
  }

  share() {
    this.shareAction.emit();
  }

}
