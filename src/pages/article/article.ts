import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { WpProvider } from '../../providers/wp/wp';
import { FavProvider } from '../../providers/fav/fav';

@IonicPage({
  name: 'article',
  segment: 'article/:slug',
  priority: 'high',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  article: any;
  favs: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public gtp: GtranslateProvider,
    private openUrl: OpenUrlProvider,
    private wp: WpProvider,
    private fav: FavProvider,
  ) {

    this.article = this.navParams.get('article');
    const slug = this.navParams.get('slug');
    if (!this.article) {
      if(!slug){
        this.navCtrl.pop();
        return;
      } else {
        this.wp.getArticle(slug).subscribe((data) => {
          this.article = data[0];
        })
      }
    }

    this.gtp.last$.subscribe((last) => {
      this.updateLinks();
    })

    this.loadFavs();
  }

  loadFavs() {
    console.log('loadFavs');
    this.fav.getItems().then((data) => {
      console.log('loadFavs loaded!', data);
      this.favs = data;
    }).catch(err => {
      console.log('loadFavs err', err);
    })
  }

  isFav(link) {
    return this.favs.find(fav => fav.id === link.id)
  }

  addFav(link) {
    this.fav.addItem(link).then((res) => {
      console.log(res);
      this.loadFavs();
    })
  }

  removeFav(link) {
    this.fav.removeItem(link).then((res) => {
      console.log(res);
      this.loadFavs();
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

  openExternal(url) {
    this.openUrl.open(url);
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
