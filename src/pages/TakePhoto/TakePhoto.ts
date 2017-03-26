import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Http} from "@angular/http";
import {Headers, RequestOptions} from '@angular/http';
import {Response} from '@angular/http'
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";
import {DomSanitizer} from '@angular/platform-browser';
import {NavController} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {StartPage} from "../start/start";
import {ActionSheetController} from 'ionic-angular';
import {WaitingPage} from "../waiting/waiting";
import {WinnerPage} from "../winner/winner";
import {Player} from "../../app/player";

declare var $: any;

@Component({
  selector: 'page-take-photo',
  templateUrl: 'TakePhoto.html',
  providers: [Camera]
})
export class TakePhotoPage {
  public base64Image: string = "";
  public error: string = "";

  constructor(private camera: Camera,
              private http: Http,
              private nav: NavController,
              private auth: AuthService,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private _DomSanitizationService: DomSanitizer) {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 640,
      targetHeight: 480
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log("Image data loaded!");
      }, (err) => {
        console.log("Image error!");
        this.closePreview();
        this.error = err;
      });
  }

  sendPicture() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Submission',
      subTitle: 'Are you sure you want to submit this picture?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.sendPic();
            this.nav.setRoot(WaitingPage, {waitReason: "waitingOnOthers"}, {animate: true, direction: "forward"});
          }
        }
      ]
    });
    confirm.present();
  }

  sendPic() {
    let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/uploadPicture';
    let body =
      {
        "gameID": Player.gameId,
        "roundID": "" + Player.round,
        "username": Player.username,
        // "playerID": "" + Player.id,
        "imageID": new Date().getTime(),
        "imageData": this.base64Image,
      };

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

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
          return;
        }
      );
  }

  getResults(callback) {
    let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/results';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = {
      gameID : Player.gameId
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

  closePreview() {
    this.base64Image = "";
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
      this.nav.setRoot(StartPage, {}, {animate: true, direction: "back"})
    });
  }
}
