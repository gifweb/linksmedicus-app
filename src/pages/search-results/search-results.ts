import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { OpenUrlProvider } from '../../providers/open-url/open-url';


@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  isLoading = true;
  results: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private openUrl: OpenUrlProvider
  ) {
  }

  ionViewDidLoad() {
    const s = this.navParams.get('s');
    this.wp.search(s).subscribe((data) => {
      this.isLoading = false;
      this.results = data.result;
      this.updateLinks();
    })
  }

  updateLinks() {
    //use $timeout wait for items to be rendered before looking for links
    console.log('updateLinks');

    setTimeout(() => {
      const $links = document.querySelectorAll(".search-content .card a");
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
