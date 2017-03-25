import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StartPage} from "../pages/start/start";
import {TakePhotoPage} from '../pages/TakePhoto/TakePhoto';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage = HomePage;
    rootPage = StartPage;
  // rootPage = TakePhotoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
