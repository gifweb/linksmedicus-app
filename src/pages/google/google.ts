import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@IonicPage({
  name: 'google',
  priority: 'high',
  segment: 'google-translate-disclaimer'
})
@Component({
  selector: 'page-google',
  templateUrl: 'google.html',
})
export class GooglePage {

  google: any[];
  googleLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    public gtp: GtranslateProvider,
  ) {
    this.loadGoogle();
  }

  loadGoogle() {
    this.googleLoading = true;
    this.wp.getPage('google-translate-disclaimer').subscribe((data) => {
      this.googleLoading = false;
      this.google = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GooglePage');
  }

}
