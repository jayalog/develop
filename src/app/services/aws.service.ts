import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Auth } from 'aws-amplify';
import { LocalStorage } from './localstorage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AwsService {
  registeredUserInfo: any = null;
  constructor(private toastrService: ToastrService) { }

  saveUserAttr(user: any): any {
    const userAttributes = {};
     const promise: Promise<void> = new Promise<any>((resolve, reject) => {
        Auth.userAttributes(user).then(result => {
          for (let i = 0; i < result.length; i++) {
            userAttributes[result[i].getName()] = result[i].getValue();
          }
          console.log('%cCognito User Pools User Attributes: ', userAttributes);
          LocalStorage.setObject('userProfile', userAttributes);
          resolve(userAttributes);
        }).catch(err => {
          console.log('error in getting user attributes', err);
          this.toastrService.error("Error in getting user attributes", "Server Error");
          reject(err);
        });
     });
      return promise;
  }

  saveRegisteredUserInfo(user: any) {
    this.registeredUserInfo = user;
  }

  getRegisteredUserInfo() {
    return this.registeredUserInfo;
  }


}
