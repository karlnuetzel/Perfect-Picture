import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StartPage} from "../pages/start/start";
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage = StartPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public storage: Storage) {
    MyApp.storage = storage;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public static storage: Storage;

  //SAVE (OR UPDATE)
  public static saveValueWithKey(saveKey, saveValue): void {
      MyApp.storage.set(saveKey, saveValue).then(() => {
      console.log("Saved value \"" + saveValue + "\" to key \"" + saveKey + "\".");
    });
  }

    //FETCH
  public static fetchValueFromKey(fetchKey): Promise<any> {
      return MyApp.storage.get(fetchKey);
  }

  // //DELETE
  // public static deleteValueWithKey(deleteKey): void {
  //   MyApp.storage.remove(deleteKey).then(() => {
  //     console.log("Deleted value associated with key \"" + deleteKey + "\".");
  //   });
  // }
  //
  // //CLEAR
  // public static clearLocalStorage(): void {
  //   MyApp.storage.clear().then(() => {
  //     console.log("Local Storage cleared.");
  //   });
  // }
}
