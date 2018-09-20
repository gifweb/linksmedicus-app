import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@IonicPage({
  name: 'privacy',
  priority: 'high',
  segment: 'privacy-policy'
})
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  privacy: any[];
  privacyLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    public gtp: GtranslateProvider,
  ) {
    this.loadPrivacy();
  }

  loadPrivacy() {
    this.privacyLoading = true;
    this.wp.getPage('privacy-policy').subscribe((data) => {
      this.privacyLoading = false;
      this.privacy = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }

  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }
}
