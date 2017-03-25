import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

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
  private loadingCtrl : LoadingController) {

    this.presentLoading();
  }


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Waiting on other players." +
      "Feel free to leave the app."
    });
    this.loading.present();
  }
}
