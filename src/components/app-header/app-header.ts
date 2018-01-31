import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  constructor(
    private menuCtrl: MenuController,
  ) {
    console.log('Hello AppHeaderComponent Component');
  }

  toggleRightMenu() {
    console.log('toggleRightMenu');
    this.menuCtrl.toggle('right');
  }


}
