import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {TakePhotoPage} from '../pages/TakePhoto/TakePhoto';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StartPage} from "../pages/start/start";
import {AuthService} from "../providers/auth-service";
import {JoinPage} from "../pages/join/join";
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    TakePhotoPage,
    StartPage,
    JoinPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TakePhotoPage,
    StartPage,
    JoinPage,
    RegisterPage
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
