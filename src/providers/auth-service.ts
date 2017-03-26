import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions, Http, Response} from "@angular/http";
import {Player} from "../app/player";
import {MyApp} from "../app/app.component";

// export class User {
//   name: string;
//   username: string;
//
//   constructor(name: string, username: string) {
//     this.name = name;
//     this.username = username;
//   }
// }

@Injectable()
export class AuthService {
  currentUser: Player;
  responseBody: Object;

  constructor(public http: Http){}

  public login(credentials) {
    if (credentials.username === null || credentials.gameId === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.checkCredentials(credentials, function(response){
            let access = (response.status == 200);
            let message = response.body;

            if (access){
                Player.username = credentials.username;
                MyApp.fetchValueFromKey("round").then((value) => {
                    if (value != null) {
                        Player.round = value;
                    } else {
                        Player.round = 0;
                    }
                });

                MyApp.fetchValueFromKey("scoreThisRound").then((value) => {
                    if (value != null) {
                        Player.scoreThisRound = value;
                    } else {
                        Player.scoreThisRound = 0;
                    }
                });

                MyApp.fetchValueFromKey("totalScore").then((value) => {
                    if (value != null) {
                        Player.totalScore = value;
                    } else {
                        Player.totalScore = 0;
                    }
                });
            }

            observer.next(access, message);
            observer.complete();
        });

      });
    }
  }
  
  public checkCredentials(creds, callback) {
    let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/join';
    let body =
        {
          "gameId": creds.gameId,
          "username": creds.username,
          "password": creds.password
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
              callback(responseBody);
              return;
            }
        );
    // return "";
  }

  public register(credentials) {
    if (credentials.username === null || credentials.gameId === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  // public getUserInfo() : User {
  //   return this.currentUser;
  // }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
