import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {StartPage} from "../start/start";
import {Player} from "../../app/player";
import {MyApp} from "../../app/app.component";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nav: NavController, private auth: AuthService,
              private actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinnerPage');
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    // MyApp.fetchValueFromKey("players").then((data) => {
      // if (data != null) {
      //   this.fromStorage(data);
      // } else {
        this.presentLoading();
        this.fromService("");
      // }
    // });
  }

  // fromStorage(json: string): void {
  //   let players: Array<Player> = [];
  //
  //   JSON.parse(JSON.stringify(json))
  //     .map((player: Player) => {
  //       players.push(player);
  //     });
  //
  //   this.playerTable = players;
  // }

  fromService(option: String): void {
    setTimeout(() => {
      this.players = [{
        "round" : 1,
        "username" : "Kyle",
        "scoreThisRound" : 0,
        "totalScore" : 79
      }, {
        "round" : 1,
        "username" : "Justin",
        "scoreThisRound" : 50,
        "totalScore" : 50
      }, {
        "round" : 1,
        "username" : "Alex",
        "scoreThisRound" : 0,
        "totalScore" : 95
      }, {
        "round" : 1,
        "username" : "Brandon",
        "scoreThisRound" : 0,
        "totalScore" : 80
      }];

      this.players = JSON.parse(JSON.stringify(this.players));

      Player.round = this.players[0].round++;
      MyApp.saveValueWithKey("round", this.players[0].round++);

      this.players.forEach(function(player){
        if (player.username == Player.username){
          Player.scoreThisRound = player.scoreThisRound;
          MyApp.saveValueWithKey("scoreThisRound", Player.scoreThisRound);
          Player.totalScore = player.totalScore;
          MyApp.saveValueWithKey("totalScore", Player.totalScore);
        }
      });

      option != "no-loading" ? this.loading.dismissAll() : "";
    }, 2000);
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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
      this.nav.setRoot(StartPage, {}, {animate: true, direction: "back"})
    });
  }

}
