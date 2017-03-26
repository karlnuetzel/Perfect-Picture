import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import {StartPage} from "../start/start";
import {AuthService} from "../../providers/auth-service";
import {Headers, RequestOptions, Response, Http} from "@angular/http";
import {TakePhotoPage} from "../TakePhoto/TakePhoto";
import {WinnerPage} from "../winner/winner";
import {PreviewPhotoPage} from "../preview-photo/preview-photo";
import {Observable} from "rxjs";
import {Player} from "../../app/player";

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
    jsonRes;
    base64string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private loadingCtrl: LoadingController, private actionSheetCtrl: ActionSheetController,
                private auth: AuthService, public http: Http) {
        this.jsonRes = {};
    }

    ngOnInit() {
        let timer = Observable.timer(2000,10000);
        timer.subscribe(()=>this.doRefresh(null));
        if (this.navParams.get("waitReason") == "waitingOnOthers") {
            this.getResults(function (res) {
                this.jsonRes = JSON.parse(JSON.stringify(res));
            });

            setTimeout(() => {
                if (this.jsonRes.results) {
                    this.navCtrl.setRoot(WinnerPage, this.jsonRes, {animate: true, direction: "forward"});
                }
            }, 500);
        }
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        if (this.navParams.get("waitReason") == "notJudge") {
            this.getPicture();//function(pic){
            //     if (pic.base64string){
            //         this.navCtrl.setRoot(PreviewPhotoPage, {}, {animate: true, direction: "forward"});
            //     }
            // });
        } else {
            this.getResults(function (res) {
                this.jsonRes = JSON.parse(JSON.stringify(res));
            });
        }
        setTimeout(() => {
            console.log('Async operation has ended');

            if (this.jsonRes.results) {
                this.navCtrl.setRoot(WinnerPage, this.jsonRes, {animate: true, direction: "forward"});
            }

            if (this.base64string){
                this.navCtrl.setRoot(PreviewPhotoPage, {}, {animate: true, direction: "forward"});
            }

            refresher.complete();
        }, 2000);
    }

    getResults(callback) {
        let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/results';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = {
            gameID : Player.gameID
        };
        this.http
            .post(url, body, options)
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

    getPicture(){//callback){
        let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/judgesImage';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = {
            gameID : Player.gameID
        };
        this.http
            .post(url, body, options)
            .map(
                (response: Response) => {
                    console.log(response);
                    return response.json();
                }
            )
            .subscribe(
                (responseBody: Object) => {
                    console.log("Response Body: \"" + responseBody + "\"");
                    // callback(JSON.parse(JSON.stringify(responseBody)).base64string);

                    this.base64string = (JSON.parse(JSON.stringify(responseBody)).base64string);
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
                }, {
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
