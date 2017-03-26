import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {StartPage} from "../start/start";
import {AuthService} from "../../providers/auth-service";

/*
  Generated class for the Loading page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html'
})
export class WaitingPage {
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private loadingCtrl : LoadingController, private actionSheetCtrl: ActionSheetController, private auth: AuthService,) {
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'Exit',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(StartPage, {}, {animate: true, direction: "back"})
    });
  }
}
