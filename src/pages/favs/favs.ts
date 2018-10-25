import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FavProvider } from '../../providers/fav/fav';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@IonicPage({
  name: 'favs',
  priority: 'high',
  segment: 'favs',
})
@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html',
})
export class FavsPage {

  @ViewChild(Content) content: Content;

  favs: any[];
  favsLoading: boolean = false;
  favsPage: number = 1;
  category: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
    private fav: FavProvider,
    public gtp: GtranslateProvider,
  ) {
    this.gtp.last$.subscribe((last) => {
      this.updateLinks();
    })

  }

  ionViewDidEnter(){
    this.loadFavs();

  }

  openArticle(article) {
    this.navCtrl.push('article', { article, slug: article.slug })
  }

  loadFavs() {
    this.favsLoading = true;

    console.log('loadFavs');
    this.fav.getItems().then((data) => {
      console.log('loadFavs loaded!', data);
      this.favs = data;
      this.favsLoading = false;

    }).catch(err => {
      console.log('loadFavs err', err);
      this.favsLoading = false;

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

  scrollTop() {
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  openExternal(url) {
    this.openUrl.open(url);
  }

  share(url, title, description) {
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
