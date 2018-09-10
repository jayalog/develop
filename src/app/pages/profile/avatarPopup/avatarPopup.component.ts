import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
// import * as canvasToBlob from 'blueimp-canvas-to-blob/js/canvas-to-blob.js';

import { uploadService } from '../../../services/upload.service';

import { LocalStorage } from '../../../services/localstorage.service';
import { Croppie } from 'assets/croppie/croppie';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'fury-avatar-popup',
  templateUrl: './avatarPopup.component.html',
  styleUrls: ['./avatarPopup.component.scss']
})
export class AvatarPopupComponent implements OnInit, AfterViewInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  isEdit: boolean;
  url: any;
  cropperSettings: CropperSettings;
  resize: any;
  croppedImage: any;
  originalImage: any;
  newImageSelected = false;
  isLoading = true;

  constructor( @Inject(MAT_DIALOG_DATA) public data1: any,
    private dialogRef: MatDialogRef<AvatarPopupComponent>, private sanitizer: DomSanitizer) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    console.log(this.data1);
    this.url = {
      croppedImage: this.data1.image + '?' + new Date().getTime() || null
    };
    if (this.url.croppedImage) {
      this.url.fullImage = this.data1.fullImage + '?' + new Date().getTime();
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // let image: any = new Image();
    // image.src = 'data:image/png;base64,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';
    // image.src = this.data1.image;
    // this.cropper.setImage(image);
    this.isLoading = false;
    let self = this;
    let el = document.getElementById('resizer-demo');
    this.resize = new Croppie(el, {
      viewport: { width: 200, height: 200 },
      boundary: { width: 400, height: 300 },
      showZoomer: false,
      enableOrientation: true,
      update: function (_data) {
        self.resize.result('blob').then(function (blob) {
          console.log(blob);
          if (blob) {
            self.croppedImage = blob;
            let imageUrl = URL.createObjectURL(blob);
            self.url.croppedImage = self.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
          }

        });
      }
    });
    this.resize.bind({
      url: this.url.fullImage || null,
      zoom: 0
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  fileChangeListener($event) {
    this.newImageSelected = true;
    let image: any = new Image();
    let file: File = this.originalImage = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.originalImage = image.src;
      that.resize.bind({
        url: loadEvent.target.result
      });
    };

    myReader.readAsDataURL(file);
  }

  saveCroppedImage() {
    console.log('this.data.image', this.croppedImage, this.originalImage);
    this.uploadAvatars();
  }

  convertURIToImageData(_URI) {
    // return new Promise(function (resolve, reject) {
    //   if (URI == null) { return reject(); }
    //   let blob = canvasToBlob(URI);
    //   console.log('blob object', blob);
    //   resolve(blob);
    //   // const canvas = document.createElement('canvas'),
    //   //   context = canvas.getContext('2d'),
    //   //   image = new Image();
    //   // image.addEventListener('load', function () {
    //   //   canvas.width = image.width;
    //   //   canvas.height = image.height;
    //   //   context.drawImage(image, 0, 0, canvas.width, canvas.height);
    //   //   canvas.toBlob(function (obj) {
    //   //     console.log('blob object', obj);
    //   //     resolve(obj);
    //   //   });
    //   // }, false);
    //   // image.src = URI;
    // });
  }

  uploadAvatars(): void {
    let url: string[] = [];

    uploadService.uploadFile(this.croppedImage, 'cropped.png').then((data) => {
      console.log('upload successfull', data);
      url[1] = 'https://s3.ap-south-1.amazonaws.com/collab-rbfc-private/creator/' + LocalStorage.getObject('userProfile')['custom:UID'] + '/avatar/cropped.png';
      if (this.newImageSelected) {
        let filename = 'original.' + this.originalImage.name.split('.')[1];
        uploadService.uploadFile(this.originalImage, filename).then((data) => {
          console.log('original upload successfull', data);
          url[0] = 'https://s3.ap-south-1.amazonaws.com/collab-rbfc-private/creator/' + LocalStorage.getObject('userProfile')['custom:UID'] + '/avatar/' + filename;
          this.dialogRef.close(url);
        }).catch((err) => {
          console.log('err', err);
        });
      } else {
        url[0] = null;
        this.dialogRef.close(url);
      }
    }).catch((err) => {
      console.log('err', err);
    });




  }
}
