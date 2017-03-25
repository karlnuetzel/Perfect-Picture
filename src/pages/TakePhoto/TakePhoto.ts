import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Http} from "@angular/http";
import {Headers, RequestOptions} from '@angular/http';
import {Response} from '@angular/http'
import 'rxjs/add/operator/map';

declare var $: any;

@Component({
  selector: 'page-take-photo',
  templateUrl: 'TakePhoto.html',
  providers: [Camera]
})
export class TakePhotoPage {
  public base64Image: string = "";
  public error: string = "";

  constructor(private camera: Camera, private http: Http) {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log("Image data loaded!");
      alert("Image data loaded!");
    }, (err) => {
      console.log("Image error");
      this.error = err;
    });
  }

  sendPicture() {
    alert(this.base64Image);
    let url = 'http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/upload';
    let body =
      {
        "imageData": this.base64Image
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
}
