import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { FavProvider } from '../../providers/fav/fav';

@IonicPage({
  name: 'links',
  priority: 'high',
  segment: 'links/:slug',
  defaultHistory: ['specialties']
})
@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {

  @ViewChild(Content) content: Content;

  links: any[];
  linksLoading: boolean = false;
  linksPage: number = 1;
  favs: any[];

  category: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
    private fav: FavProvider,
  ) {
    this.category = this.navParams.get('category');
    if (this.category === undefined) {
      this.navCtrl.setPages([{ page: 'specialties' }], { animate: true, animation: 'back' });
      return;
    }
    this.loadLinks(this.category.id, true);
    this.loadFavs();


  }

  loadFavs() {
    console.log('loadFavs');
    this.fav.getItems(this.category).then((data) => {
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

  loadLinks(categorySlug, flush?, infiniteScroll?: InfiniteScroll) {
    if (flush) {
      this.links = [];
    }
    this.linksLoading = true;
    this.wp.getLinks(categorySlug, this.linksPage).subscribe((data) => {
      console.log('getLinks', data);
      data.map(item => {
        this.links.push(item);
      })
      this.linksLoading = false;
      //this.updateLinks();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    }, () => {
      infiniteScroll.complete();
    })
  }

  scrollTop() {
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  doInfinite(infiniteScroll) {
    this.linksPage++;
    console.log('doInfinite', this.linksPage);
    this.loadLinks(this.category.id, false, infiniteScroll)

  }

  openExternal(url) {
    this.openUrl.open(url);
  }

  share(url, title, description) {
    this.openUrl.share(url, title, description);
  }

  /*updateLinks() {
    //use $timeout wait for items to be rendered before looking for links
    console.log('updateLinks');

    setTimeout(() => {
      const $links = document.querySelectorAll(".links-content .card a");
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
  }*/


}
