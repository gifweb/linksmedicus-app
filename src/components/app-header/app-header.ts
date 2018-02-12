import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
  ) {
    console.log('Hello AppHeaderComponent Component');
  }

  toggleRightMenu() {
    console.log('toggleRightMenu');
    //this.menuCtrl.toggle('right');
    this.navCtrl.push('SearchPage');
  }


}
