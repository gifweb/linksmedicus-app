import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage({
  name: 'home',
  priority: 'high'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  segment: string = "top10";
  top10: any[] = [];
  news: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gtp: GtranslateProvider,
    private wp: WpProvider,
  ) {
    this.wp.getTop10().toPromise().then((res) => {
      this.top10 = res;
    })
    this.wp.getLatest().toPromise().then((res) => {
      this.news = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openArticle(article) {
    this.navCtrl.push('article', { article })
  }

}
