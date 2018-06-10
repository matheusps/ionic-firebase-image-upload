import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {}

  presentSheet(){
    let sheet = this.actionSheetCtrl.create({
      title: 'Select the image source',
      buttons:[
        {
          text: 'Load from Gallery',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take a Picture',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    sheet.present();
  }

  getPicture(sourceType){
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imagePath => {
      this.image = 'data:image/jpeg;base64,' + imagePath;
    });
  }

}
