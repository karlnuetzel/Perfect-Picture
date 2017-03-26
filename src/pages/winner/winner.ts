import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {StartPage} from "../start/start";
import {Player} from "../../app/player";
import {MyApp} from "../../app/app.component";
import {TakePhotoPage} from "../TakePhoto/TakePhoto";
import {WaitingPage} from "../waiting/waiting";
import {Response, RequestOptions, Headers, Http} from "@angular/http";
import {PreviewPhotoPage} from "../preview-photo/preview-photo";

/*
 Generated class for the Winner page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-winner',
    templateUrl: 'winner.html'
})
export class WinnerPage implements OnInit {
    app: any = MyApp;
    private players;
    public loading: Loading;
    public highUser: string = "";
    public highScore: string = "";

    constructor(public navCtrl: NavController, public navParams: NavParams, private nav: NavController, private auth: AuthService,
                private actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public http: Http) {
    }


    ngOnInit(): void {
        this.fromService("");
    }

    fromService(option: String): void {

        this.players = this.navParams.get("results");

        Player.round = this.players[0].round++;
        MyApp.saveValueWithKey("round", this.players[0].round++);

        this.players.forEach(function (player) {
            if (player.username == Player.username) {
                Player.id = player.playerID;
                Player.scoreThisRound = player.score;
                MyApp.saveValueWithKey("scoreThisRound", Player.scoreThisRound);
                Player.totalScore = player.totalScore;
                MyApp.saveValueWithKey("totalScore", Player.totalScore);
                if (player.placement == 0) {
                    Player.isJudge = true;
                    this.highScore = player.score;
                    this.highUser = Player.username;
                } else {
                    Player.isJudge = false;
                }
            }
        });

        option != "no-loading" ? this.loading.dismissAll() : "";
    }

    nextRound() {
        if (Player.isJudge) {
            this.nav.setRoot(TakePhotoPage, {}, {animate: true, direction: "forward"});
        } else {
            this.getPicture(function(pic){
                if (pic.base64string){
                    this.nav.setRoot(PreviewPhotoPage, {}, {animate: true, direction: "forward"});
                } else {
                    this.nav.setRoot(WaitingPage, {waitReason: "notJudge"}, {animate: true, direction: "forward"});
                }
            })
        }
    }

    getPicture(callback){
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
                    callback(JSON.parse(JSON.stringify(responseBody)).base64string);
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

    getWinner(currPlayer){
        this.players.forEach(function(player){
            if (player.totalScore > currPlayer.totalScore){
                return "";
            }
        });
        return "highlight";
    }

    public logout() {
        this.auth.logout().subscribe(succ => {
            this.nav.setRoot(StartPage, {}, {animate: true, direction: "back"})
        });
    }

}
