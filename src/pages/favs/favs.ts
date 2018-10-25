import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FavProvider } from '../../providers/fav/fav';

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
  ) {
    

  }

  ionViewDidEnter(){
    this.loadFavs();

  }

  loadFavs() {
    this.favsLoading = true;

    console.log('loadFavs');
    this.fav.getItems(false).then((data) => {
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
    this.fav.addItem(link, this.category).then((res) => {
      console.log(res);
      this.loadFavs();
    })
  }

  removeFav(link) {
    this.fav.removeItem(link, this.category).then((res) => {
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

}
