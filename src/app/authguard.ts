import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private amplifyService: AmplifyService) { }

  canActivate(): Promise<boolean> {
    return this.amplifyService.auth().currentAuthenticatedUser().then((user) => {
      return true;
    }).catch((err) => {
      console.log('session is invalid');
      this.router.navigate(['/login']);
      return false;
    });
  }

}
