import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@IonicPage({
  name: 'about',
  priority: 'high',
  segment: 'about-us'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  about: any[];
  aboutLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    public gtp: GtranslateProvider,
  ) {
    this.loadAbout();
  }

  loadAbout() {
    this.aboutLoading = true;
    this.wp.getPage('about-us').subscribe((data) => {
      this.aboutLoading = false;
      this.about = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }
}
