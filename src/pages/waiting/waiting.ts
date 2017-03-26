import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {StartPage} from "../start/start";
import {AuthService} from "../../providers/auth-service";
import {Headers, RequestOptions, Response, Http} from "@angular/http";
import {TakePhotoPage} from "../TakePhoto/TakePhoto";
import {WinnerPage} from "../winner/winner";

/*
  Generated class for the Loading page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html'
})
export class WaitingPage implements OnInit {
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private loadingCtrl : LoadingController, private actionSheetCtrl: ActionSheetController,
              private auth: AuthService, public http: Http) {

  }

  ngOnInit(){
    if (this.navParams.get("waitReason") == "waitingOnOthers"){
      this.getResults(function(res){
        let json = JSON.parse(JSON.stringify(res));
        if (json.results != []) {
          this.navCtrl.setRoot(WinnerPage, json, {animate: true, direction: "forward"});
        }
      });
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getResults(function(res){
      let json = JSON.parse(JSON.stringify(res));
      if (json.results != []) {
        this.navCtrl.setRoot(WinnerPage, json, {animate: true, direction: "forward"});
      } else if (this.navParams.get("waitReason") == "notJudge"){
        this.navCtrl.setRoot(TakePhotoPage, {}, {animate: true, direction: "forward"});
      }
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getResults(callback) {
    let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/results';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    this.http
        .get(url, options)
        .map(
            (response: Response) => {
              console.log(response);
              return response.json();
            }
        )
        .subscribe(
            (responseBody: Object) => {
              console.log("Response Body: \"" + responseBody + "\"");
              callback(responseBody);
            }, err => {
              // alert(err);
            }
        );
    // return "";
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
