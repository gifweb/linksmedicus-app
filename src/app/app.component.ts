import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { OpenUrlProvider } from '../providers/open-url/open-url';
import { Deeplinks } from '@ionic-native/deeplinks';
import { OneSignal } from '@ionic-native/onesignal';
import { HeaderColor } from '@ionic-native/header-color';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'news';
  rootParams: any = {};

  pages: Array<{ title: string, component: any }>;

  searches: any[];
  searchInput: '';
  selectedSearch: any = "";

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private wp: WpProvider,
    private openUrl: OpenUrlProvider,
    private deeplinks: Deeplinks,
    private oneSignal: OneSignal,
    private headerColor: HeaderColor,
  ) {
    this.initializeApp();

    this.loadSearch();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.oneSignal.startInit('386079ff-9ad7-4969-8a4a-afd02e2c2c9e', '1089270685149');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe((res) => {
        console.log('handleNotificationReceived', res);
      });
      this.oneSignal.handleNotificationOpened().subscribe((res) => {
        console.log('handleNotificationOpened', res);
      });
      this.oneSignal.endInit();

      this.deeplinks.route({
        '/medical-specialties': { target: 'specialties' },
        '/medical-specialties/:slug': { target: 'links' },
        '/specialties/:slug': { target: 'news' },
        '/guidelines': { target: 'library' },
        '/guideline/:slug': { target: 'guidelines' },
        '/about-us': { target: 'about' },
      }).subscribe((match) => {
        console.log('Successfully matched route', match);
        this.rootPage = match.$route.target;
        this.rootParams = match.$args;
      }, (nomatch) => {
        console.log('Got a deeplink that didn\'t match', nomatch);
      });

      this.headerColor.tint('#156e8b')
      this.statusBar.styleLightContent();

      this.splashScreen.hide();
    });
  }

  loadSearch() {
    this.wp.getSearch().subscribe((res) => {
      this.searches = res;
    })
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  search() {
    console.log('search!', );

    if (this.selectedSearch === '') {
      this.openSearch();
    } else {
      const newLink = (this.selectedSearch.url).trim().replace('$palavra', this.searchInput.trim()).replace('$palavra', this.searchInput.trim()).replace('$palavra', this.searchInput.trim());
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
