import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

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

}
