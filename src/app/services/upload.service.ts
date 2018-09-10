import { Injectable } from '@angular/core';
import { Storage } from 'aws-amplify';

import { LocalStorage } from './localstorage.service';


@Injectable()
export class uploadService {


  constructor() {
  }

  public static uploadFile(file, fileName): Promise<Object> {

    const promise: Promise<Object> = new Promise<Object>((resolve, reject) => {
      const customPrefix = {
        public: 'creator/' + LocalStorage.getObject('userProfile')['custom:UID'] + '/avatar/'
      };

      Storage.put(fileName, file, {
        contentType: file.type,
        customPrefix: customPrefix
      }).
        then(result => {
          resolve(result);
          return;
        }).catch(err => {
          reject(err);
          return;
        });
    });

    return promise;
  }

  // public static uploadFile(file): any {

  //   const bucketName = Config.S3_BUCKET_NAME;
  //   const profileId = LocalStorage.getObject('userProfile')['custom:UID'];

  //   const uploadparams = {
  //     Key: '/creator/'+ profileId + '/avatar/' + file.name,
  //     ContentType: file.type,
  //     Body: file,
  //     ContentDisposition: 'attachment'
  //   };
  //   const s3 = new AWS.S3({
  //     apiVersion: '2006-03-01',
  //     params: { Bucket: bucketName },
  //     signatureVersion: 'v4',
  //     region: 'ap-south-1',
  //     httpOptions: { timeout: 0 }
  //   });
  //   const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

  //   const promise: Promise<void> = new Promise<void>((resolve, reject) => {
  //     s3.upload(uploadparams, options).
  //       on('httpUploadProgress', function (event) {
  //         if (event) {
  //          // uploadService.videoprogress = Math.round((event.loaded * 100) / event.total);
  //           console.log('uploading', Math.round((event.loaded * 100) / event.total));
  //         }

  //       }).send(function (err, data) {
  //         if (err) {
  //           console.log('S3 file upload Error', err);
  //           reject(err);
  //           return;
  //         } else {
  //           console.log('s3 file upload success', data);
  //           resolve(data);
  //           return;
  //         }
  //       });
  //   });

  //   return promise;
  // }
}
