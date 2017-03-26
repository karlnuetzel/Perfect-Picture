import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {RegisterPage} from '../register/register';
import {TakePhotoPage} from "../TakePhoto/TakePhoto";
import {StartPage} from "../start/start";
import {MyApp} from "../../app/app.component";

@Component({
    selector: 'page-join',
    templateUrl: 'join.html'
})
export class JoinPage implements OnInit {
    loading: Loading;
    app: any = MyApp;
    registerCredentials = {gameId: '', username: '', password: ''};

    constructor(private nav: NavController, private auth: AuthService,
                private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    ngOnInit(): void {
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

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public join() {
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe((allowed, reason: string = "") => {
                if (allowed) {
                    setTimeout(() => {
                        this.showPopup('success', reason);
                        this.app.saveValueWithKey("gameId", this.registerCredentials.gameId);
                        this.app.saveValueWithKey("username", this.registerCredentials.username);
                        this.app.saveValueWithKey("password", this.registerCredentials.password);
                        this.loading.dismiss();
                        this.nav.setRoot(TakePhotoPage, {}, {animate: true, direction: "forward"})
                    });
                } else {
                    this.showPopup("error", reason);
                }
            },
            error => {
                this.showPopup("error", error);
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    showPopup(type, text) {
        let css: string = "";
        if (type == "error") {
            css = "error"
        } else if (type == "success") {
            css = "success"
        }
        let alert = this.toastCtrl.create({
            message: "text",
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
