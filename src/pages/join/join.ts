import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, ToastController} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {RegisterPage} from '../register/register';
import {StartPage} from "../start/start";
import {MyApp} from "../../app/app.component";
import {WaitingPage} from "../waiting/waiting";

@Component({
    selector: 'page-join',
    templateUrl: 'join.html'
})
export class JoinPage implements OnInit {
    loading: Loading;
    app: any = MyApp;
    registerCredentials = {gameID: '', username: '', password: ''};

    constructor(private nav: NavController, private auth: AuthService,
                private toastCtrl: ToastController, private loadingCtrl: LoadingController) {

    }

    ngOnInit(): void {
        this.app.fetchValueFromKey("gameID").then((value) => {
            if (value != null) {
                this.registerCredentials.gameID = value;
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

    public join() {
        this.showLoading();
        this.auth.login(this.registerCredentials).subscribe((response) => {
                let allowed = response[0];
                let reason = response[1];
                if (allowed) {
                    setTimeout(() => {
                        this.showPopup('success', reason);
                        this.app.saveValueWithKey("gameID", this.registerCredentials.gameID);
                        this.app.saveValueWithKey("username", this.registerCredentials.username);
                        this.app.saveValueWithKey("password", this.registerCredentials.password);
                        this.loading.dismiss();
                        this.nav.setRoot(WaitingPage, {waitReason: "notJudge"}, {animate: true, direction: "forward"})
                    });
                } else {
                    this.showPopup("error", reason);
                    this.loading.dismiss();
                }
            },
            error => {
                this.showPopup("error", error);
                this.loading.dismiss();
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
