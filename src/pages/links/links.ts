import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { NavParams } from 'ionic-angular/navigation/nav-params';

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

  category: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
  ) {
    this.category = this.navParams.get('category');
    if(this.category === undefined){
      this.navCtrl.setPages([{page: 'specialties'}], {animate: true, animation: 'back'});
      return;
    }
    this.loadLinks(this.category.id, true);
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

  scrollTop(){
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  doInfinite(infiniteScroll) {
    this.linksPage++;
    console.log('doInfinite', this.linksPage);
    this.loadLinks(this.category.id, false, infiniteScroll)

  }

  openExternal(url){
    this.openUrl.open(url);
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
