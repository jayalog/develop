import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { API } from 'aws-amplify';
import * as models from './model/models';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiService {
  apiName = 'Collab-API';
  init: Object = {};
  private profileInfoObs = new Subject<any>();
  profileInfo = this.profileInfoObs.asObservable();

  constructor(private toasterService: ToastrService) { }

  listAllProfiles(): Promise<models.ProfilesListResponse> {
    const path = '/profiles';

    return new Promise((resolve, reject) => {
      API.get(this.apiName, path, this.init).then(response => {
        console.log(response);
        resolve(response);
      }).catch(error => {
        console.log(error.response);
        this.handleError(error.response);
        reject(error);
      });
    });
  }

  getProfile(profileid: string): Promise<models.Profile> {
    const path = '/profiles/' + profileid;

    return new Promise((resolve, reject) => {
      API.get(this.apiName, path, this.init).then(response => {
        console.log(response);
        // this.saveProfileInfoObservable(response);
        resolve(response);
      }).catch(error => {
        console.log(error.response);
        if (error.response.status !== 404) {
          this.handleError(error.response);
        }
        reject(error);
      });
    });

  }

  postProfile(profile: models.Profile): Promise<models.Profile> {
    const path = '/profiles';
    this.init['body'] = profile;
    return new Promise((resolve, reject) => {
      API.post(this.apiName, path, this.init).then(response => {
        console.log(response);
        // this.saveProfileInfoObservable(response);
        resolve(response);
      }).catch(error => {
        console.log(error.response);
        this.handleError(error.response);
        reject(error);
      });
    });

  }

  handleError(message) {
    message = message ? message : "Error while performing the operation";
    this.toasterService.error(message, "Server Error");
  }

  saveProfileInfoObservable(profileResponse: models.Profile) {
    this.profileInfoObs.next(profileResponse);
  }
}
