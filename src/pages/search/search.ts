import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { OpenUrlProvider } from '../../providers/open-url/open-url';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searches: any[];
  searchInput: '';
  selectedSearch: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private openUrl: OpenUrlProvider,
  ) {
    this.loadSearch();
  }

  loadSearch() {
    this.wp.getSearch().subscribe((res) => {
      this.searches = res;
      this.selectedSearch = res[0];
    })
  }


  search() {
    console.log('search!', this.selectedSearch);

    if (this.selectedSearch === '') {
      this.openSearch();
    } else {
      const searchInput = this.searchInput.trim().replace(/ /g,"+");
      const newLink = (this.selectedSearch.url).trim()
      .replace('$palavra', searchInput)
      .replace('$palavra', searchInput)
      .replace('$palavra', searchInput);
      this.openExternal(newLink);
    }

  }

  openSearch() {
    console.log('internal search', this.searchInput);
    this.openExternal('https://linksmedicus.com/searching/?q=' + this.searchInput.trim())
  }

  openExternal(url) {
    console.log('openExternal', url)
    this.openUrl.open(url);
  }

}
