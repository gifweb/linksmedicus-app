import { Component } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-footer',
  templateUrl: 'app-footer.html'
})
export class AppFooterComponent {


  constructor(
    public gtp: GtranslateProvider,
    private navCtrl: NavController,
  ) {

  }

  openAbout(){
    this.navCtrl.setRoot('about')
  }


  openTerms(){
    this.navCtrl.setRoot('terms')
  }

  openPrivacy(){
    this.navCtrl.setRoot('privacy')
  }

  openGoogle(){
    this.navCtrl.setRoot('google')
  }

}
