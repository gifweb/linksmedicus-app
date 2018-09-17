import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

//Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { OneSignal } from '@ionic-native/onesignal';
import { HeaderColor } from '@ionic-native/header-color';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SQLite } from '@ionic-native/sqlite';
import { Keyboard } from '@ionic-native/keyboard';
//Providers
import { WpProvider } from '../providers/wp/wp';
import { OpenUrlProvider } from '../providers/open-url/open-url';
import { ComponentsModule } from '../components/components.module';
import { GuidelinesPopoverPage } from '../pages/guidelines/guideline.popover';
import { FavProvider } from '../providers/fav/fav';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { Firebase } from '@ionic-native/firebase';
import { GtranslateProvider } from '../providers/gtranslate/gtranslate';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    GuidelinesPopoverPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GuidelinesPopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BrowserTab,
    ThemeableBrowser,
    Deeplinks,
    OneSignal,
    HeaderColor,
    SocialSharing,
    SQLite,
    Keyboard,
    Firebase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WpProvider,
    OpenUrlProvider,
    FavProvider,
    LocalDbProvider,
    GtranslateProvider,
  ]
})
export class AppModule { }
