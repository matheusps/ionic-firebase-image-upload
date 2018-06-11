import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: any;
  file: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private alertController: AlertController
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
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then(imagePath => {
      this.image = 'data:image/jpeg;base64,' + imagePath;
      this.file = imagePath;
    });
  }

  uploadImg(){
    console.log('entrou');
    let loading = this.loading();
    let img = this.image;
    this.storage.ref(`images/${Date.now()}.jpeg`).putString(img, 'data_url').then( 
      url => {
        console.log('uploaded', url);
        loading.dismiss();
        this.alert();
      });
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Wait, uploading the image...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  alert() {
    let alert = this.alertController.create({
      title: 'Done',
      subTitle: 'The upload is complete!',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  

}
