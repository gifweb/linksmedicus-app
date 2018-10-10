import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, Menu, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { OneSignal } from '@ionic-native/onesignal';
import { HeaderColor } from '@ionic-native/header-color';
import { Firebase } from '@ionic-native/firebase';
import { WpProvider } from '../providers/wp/wp';
import { OpenUrlProvider } from '../providers/open-url/open-url';
import { GtranslateProvider } from '../providers/gtranslate/gtranslate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('menu') menu: Menu;
  @ViewChild('slides') slides: Slides;

  rootPage: any = 'home';
  rootParams: any = {};
  openedMenu: string = '';
  pages: Array<{ title: string, component: any }>;

  submenus: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private deeplinks: Deeplinks,
    private oneSignal: OneSignal,
    private headerColor: HeaderColor,
    private app: App,
    private firebase: Firebase,
    private wp: WpProvider,
    private openUrlProvider: OpenUrlProvider,
    public gtp: GtranslateProvider,
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.loadMenus().then(() => {
      console.log('loadMenus');
    });

    this.platform.ready().then(() => {

      if (this.platform.is('cordova')) {
        this.oneSignal.startInit('386079ff-9ad7-4969-8a4a-afd02e2c2c9e', '1089270685149');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe((res) => {
          console.log('handleNotificationReceived', res);
          this.nav.setRoot('news');
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
          '/terms-of-use': { target: 'terms' },
          '/privacy-policy': { target: 'privacy' },
          '/google-translate-disclaimer': { target: 'google' },

          '/news/:slug': { target: 'article' },
          '/2017/news/:slug': { target: 'article' },

        }).subscribe((match) => {
          console.log('Successfully matched route', match);
          if (match.$route.target === 'article') {
            this.nav.push('article', match.$args);
          } else {
            this.nav.setRoot(match.$route.target, match.$args);
          }
        }, (nomatch) => {
          console.log('Got a deeplink that didn\'t match', nomatch);
        });

        this.headerColor.tint('#156e8b')
        this.statusBar.styleLightContent();

        this.splashScreen.hide();
        this.app.viewDidEnter.subscribe((evt) => {
          // evt.instance is the Ionic page component
          console.log('evt', evt)
          this.firebase.setScreenName(evt.name);
          this.firebase.logEvent('page_view', { page: evt.name, data: evt.data })
            .then((res: any) => console.log(res))
            .catch((error: any) => console.error(error));
        });
      }


    });
  }

  async loadMenus() {
    const submenuNews = await this.wp.getSubMenuNews();
    const submenuDatabase1 = await this.wp.getSubMenuDatabase(1);
    const submenuDatabase2 = await this.wp.getSubMenuDatabase(2);
    const submenuGuidelines = await this.wp.getSubMenuGuidelines();

    this.submenus = {
      news: submenuNews,
      database: [submenuDatabase1, submenuDatabase2],
      guidelines: submenuGuidelines,
    }

    this.slides.resize();

  }

  ngAfterViewInit() {
    this.slides.onlyExternal = true;
    this.slides.speed = 500;
    this.slides.autoHeight = true;
    this.slides.update();
    this.menu.ionOpen.subscribe((isOpen) => {
      this.slides.update();
    })
  }

  openMenu(menu: string) {
    this.openedMenu = menu;
    setTimeout(() => {
      this.slides.resize();
      this.slides.slideTo(1);
    }, 0)
  }

  closeMenu() {
    this.slides.slideTo(0);

  }

  openPage(page, params?) {
    this.nav.setRoot(page, params);
  }

  openUrl(url) {
    this.openUrlProvider.open(url)
  }

  openUrl2(url) {
    this.openUrlProvider.openNoMenu(url)
  }

  openSpecialties() {
    this.nav.setRoot('specialties');
  }

  openGeneralTopics() {
    this.nav.setRoot('specialties', { generalTopics: true });
  }



  translate(term) {
    return this.gtp.getTranslate(term, this.gtp.last);
  }

}
