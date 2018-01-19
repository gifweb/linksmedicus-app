import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';

@IonicPage({
  name: 'news',
  priority: 'high'
})
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  @ViewChild(Content) content: Content;

  news: any[];
  newsLoading: boolean = false;
  newsPage: number = 1;

  specialties: any[];
  specialtiesLoading: boolean = false;

  _specialtie: any = 177;
  get specialtie(): number {
    return this._specialtie;
  }
  set specialtie(value: number) {
    console.log('set')
    this.newsPage = 1;
    this.loadNews(value, true);
    this._specialtie = value;
  }

  constructor(
    public navCtrl: NavController,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
  ) {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.specialtiesLoading = true;
    this.wp.getSpecialties().subscribe((data) => {
      this.specialtiesLoading = false;
      console.log('getSpecialties', data);
      this.specialties = data;
      this.specialtie = 177;
    })
  }

  loadNews(specialtie, flush?, infiniteScroll?: InfiniteScroll) {
    if (flush) {
      this.news = [];
    }
    this.newsLoading = true;
    this.wp.getNews(specialtie, this.newsPage).subscribe((data) => {
      console.log('getNews', data);
      data.map(item => {
        this.news.push(item);
      })
      this.newsLoading = false;
      this.updateLinks();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  scrollTop(){
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  doInfinite(infiniteScroll) {
    this.newsPage++;
    console.log('doInfinite', this.newsPage);
    this.loadNews(this._specialtie, false, infiniteScroll)

  }

  updateLinks() {
    //use $timeout wait for items to be rendered before looking for links
    console.log('updateLinks');

    setTimeout(() => {
      const $links = document.querySelectorAll(".news-content .card a");
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
