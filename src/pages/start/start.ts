import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TakePhotoPage} from '../TakePhoto/TakePhoto';
import {RegisterPage} from "../register/register";
import {JoinPage} from "../join/join";

/*
  Generated class for the Start page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  host() {
    this.navCtrl.setRoot(RegisterPage);
  }

  join() {
    this.navCtrl.setRoot(JoinPage);
  }
}
