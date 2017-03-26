import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TakePhotoPage} from '../TakePhoto/TakePhoto';
import {RegisterPage} from "../register/register";
import {JoinPage} from "../join/join";
import {PreviewPhotoPage} from "../preview-photo/preview-photo";
// import {WinnerPage} from "../winner/winner";

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
    this.navCtrl.setRoot(RegisterPage, {}, {animate: true, direction: "forward"});
  }

  join() {
    this.navCtrl.setRoot(JoinPage, {}, {animate: true, direction: "forward"});
  }

  // winners() {
  //   this.navCtrl.setRoot(WinnerPage, {}, {animate: true, direction: "forward"});
  // }
  openPreview(){
    this.navCtrl.setRoot(PreviewPhotoPage, {}, {animate: true, direction: "forward"});
  }
}
