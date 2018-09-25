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
  segment2: string = "news";
  top10: any[] = [];
  news: any[] = [];

  submenus: any;

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

    this.loadMenus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  async loadMenus() {
    const submenuNews = await this.wp.getSubMenuNews();
    const submenuDatabase1 = await this.wp.getSubMenuDatabase(1);
    const submenuDatabase2 = await this.wp.getSubMenuDatabase(2);
    const submenuGuidelines = await this.wp.getSubMenuGuidelines();

    this.submenus = {
      news: submenuNews,
      database: [submenuDatabase1, submenuDatabase2],
      guidelines: submenuGuidelines,
    }

  }

  openArticle(article) {
    this.navCtrl.push('article', { article, slug: article.slug })
  }

  openPage(page, params?) {
    this.navCtrl.setRoot(page, params);
  }

  moreNews() {
    this.navCtrl.setRoot('news');
  }

  moreTop10() {
    this.openPage('news', { specialtie: 177, title: this.translate('TOP 10 Medical News Stories') })
  }

  translate(term) {
    return this.gtp.getTranslate(term, this.gtp.last);
  }


}
