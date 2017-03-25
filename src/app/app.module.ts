import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {TakePhotoPage} from '../pages/TakePhoto/TakePhoto';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {StartPage} from "../pages/start/start";
import {AuthService} from "../providers/auth-service";
import {JoinPage} from "../pages/join/join";
import {RegisterPage} from "../pages/register/register";
import {WaitingPage} from "../pages/waiting/waiting";

@NgModule({
  declarations: [
    MyApp,
    TakePhotoPage,
    StartPage,
    JoinPage,
    RegisterPage,
    WaitingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TakePhotoPage,
    StartPage,
    JoinPage,
    RegisterPage,
    WaitingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {
}
