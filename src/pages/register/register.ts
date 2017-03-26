import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {TakePhotoPage} from "../TakePhoto/TakePhoto";
import {StartPage} from "../start/start";
import {MyApp} from "../../app/app.component";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  registerCredentials = {gameId: '', username: '', password: ''};
  app: any = MyApp;

  constructor(private nav: NavController, private auth: AuthService, private toastCtrl: ToastController) {}

  ngOnInit() : void {
    this.app.fetchValueFromKey("gameID").then((value) => {
      if (value != null) {
        this.registerCredentials.gameId = value;
      }
    });
    this.app.fetchValueFromKey("username").then((value) => {
      if (value != null) {
        this.registerCredentials.username = value;
      }
    });
    this.app.fetchValueFromKey("password").then((value) => {
      if (value != null) {
        this.registerCredentials.password = value;
      }
    });
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.app.saveValueWithKey("gameId", this.registerCredentials.gameId);
          this.app.saveValueWithKey("username", this.registerCredentials.username);
          this.app.saveValueWithKey("password", this.registerCredentials.password);
          this.createSuccess = true;
          this.showPopup("success", "Account created sucessfully.");
          this.nav.setRoot(TakePhotoPage, {}, {animate: true, direction: "forward"})
        } else {
          this.showPopup("error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("error", error);
      });
  }

  showPopup(type, text) {
    let css : string = "";
    if (type=="error") {
      css = "error"
    } else if (type=="success") {
      css = "success"
    }
    let alert = this.toastCtrl.create({
      message: text,
      position: "bottom",
      cssClass: css,
      showCloseButton: true,
      closeButtonText: "Okay",
      duration: 3000
    });
    alert.present();
  }

  home() {
    this.nav.setRoot(StartPage, {}, {animate: true, direction: "back"});
  }
}
