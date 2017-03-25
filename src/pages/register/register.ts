import {Component, OnInit} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

  ngOnInit() : void {
    this.app.fetchValueFromKey("gameId").then((value) => {
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
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();

              this.nav.setRoot(TakePhotoPage);
            }
          }
        }
      ]
    });
    alert.present();
  }

  home() {
    this.nav.setRoot(StartPage);
  }
}
