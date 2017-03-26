import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthService} from "../../providers/auth-service";
import {Camera} from "@ionic-native/camera";
import {TakePhotoPage} from "../TakePhoto/TakePhoto";

/*
 Generated class for the PreviewPhoto page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-preview-photo',
    templateUrl: 'preview-photo.html'
})
export class PreviewPhotoPage implements OnInit {
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

    ngOnInit() {
        // this.getPicture();
    }

    takeOwnPic(){
        this.nav.push(TakePhotoPage, {}, {animate: true, direction: "forward"});
    }

}
