import {Component} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Http} from "@angular/http";
import { Headers, RequestOptions } from '@angular/http';

declare var $: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Camera]
})
export class HomePage {
  public base64Image: string;

  constructor(private camera: Camera, private http: Http) {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Image error")
    });

  }

  sendPicture() {

    /*
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    this.http.post('http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/upload', {"imageData": "swag"}, options);
    */


    $.ajax({

      type: "POST",
      url : "http://ec2-34-204-93-190.compute-1.amazonaws.com:3000/upload",
      headers: {
        'Content-Type':'application/jsonp'
      },
      data : {"imageData": "hello this is alex"},
      success: function(data, textStatus, jqXHR)
      {
        //data - response from server
        alert("this worked decent");
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        alert("this did work well");
      }
    });


  }

}
