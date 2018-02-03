import { Injectable } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class OpenUrlProvider {

  constructor(
    private platform: Platform,
    private browserTab: BrowserTab,
    private themeableBrowser: ThemeableBrowser,
    private socialSharing: SocialSharing,
  ) {

  }

  open(url: string) {

    if (url.substr(0, 4) !== 'http') {
      url = 'http://' + url;
    }

    if (!this.platform.is('cordova')) {
      window.open(url, '_system');
    } else {
      this.browserTab.isAvailable().then(isAvailable => {
        if (isAvailable) {
          this.openBrowserTab(url);
        } else {
          this.openBrowserTab(url);
        }
      })
    }
  }

  share(url: string, title: string, description: string) {

    if (url.substr(0, 4) !== 'http') {
      url = 'http://' + url;
    }

    if (this.platform.is('cordova')) {
      return this.socialSharing.share(description, title, url).then(() => {
        
      })
    }
  }

  private openBrowserTab(url: string) {
    this.browserTab.openUrl(url, { toolbarColor: "#156e8b" });
  }

  private openThemeable(url: string) {
    const options: ThemeableBrowserOptions = {
      hidden: 'true',
      hardwareback: 'true',
      statusbar: {
        color: '#00156e8b'
      },
      toolbar: {
        height: 44,
        color: '#00156e8b'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true
      },
      closeButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          image: 'share',
          imagePressed: 'share_pressed',
          align: 'right',
          event: 'sharePressed'
        }
      ],
      backButtonCanClose: true
    }
    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.show();
  }

}
