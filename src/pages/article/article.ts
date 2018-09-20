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
    if (!this.article) {
      this.navCtrl.pop();
    }

    this.gtp.last$.subscribe((last) => {
      this.updateLinks();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
    this.updateLinks();

  }

  share() {
    const url = this.article.link;
    const title = this.article.title;
    const description = this.article.content;
    this.openUrl.share(url, title, description);
  }

  updateLinks() {
    //use $timeout wait for items to be rendered before looking for links
    console.log('updateLinks');

    setTimeout(() => {
      const $links = document.querySelectorAll(".html-content a");
      for (var i = 0; i < $links.length; i++) {
        const $link: any = $links[i];
        const href = $link.href;
        $link.onclick = (e) => {
          e.preventDefault();
          const url = e.currentTarget.getAttribute("href");
          console.log('dynamic lynk', url);
          this.openUrl.open(url);
        }
      }
    }, 500);
  }

}
