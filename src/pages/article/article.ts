import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { OpenUrlProvider } from '../../providers/open-url/open-url';

@IonicPage({
  name: 'article',
  priority: 'high',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  article: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gtp: GtranslateProvider,
    private openUrl: OpenUrlProvider,
  ) {

    this.article = this.navParams.get('article');
    if(!this.article){
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

  share(){
    const url = this.article.link;
    const title = this.article.title;
    const description = this.article.content;
    this.openUrl.share(url, title, description);
  }

}
