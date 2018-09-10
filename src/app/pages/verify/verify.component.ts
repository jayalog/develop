import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AwsService } from '../../services/aws.service';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'fury-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  host: {
    '[@fadeOutAnimation]': 'true'
  },
  animations: [fadeOutAnimation]
})
export class VerifyComponent implements OnInit {

  form: FormGroup;
  error: string;
  isLoading = false;
  registeredUser: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private awsservice: AwsService,
    private toaster: ToastrService, private shared: SharedDataService
  ) {
    this.registeredUser = this.awsservice.getRegisteredUserInfo();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [this.registeredUser && this.registeredUser.username || '', [Validators.required, Validators.email]],
      code: ['', Validators.required],

    });
    console.log(Auth);
  }

  verifyAccount(): void {
    this.isLoading = true;
    Auth.confirmSignUp(this.form.controls.email.value, this.form.controls.code.value).then(data => {
      this.error = '';
      console.log(data);
      this.toaster.success('Account verification successful.');
      if (this.registeredUser) {
        Auth.signIn(this.form.controls.email.value, this.registeredUser.password)
          .then(user => {
            // this.awsservice.saveUserAttr(user);
            this.awsservice.saveUserAttr(user).then((res) => {
              console.log(res);
              this.isLoading = false;
              this.router.navigate(['/']);
              this.awsservice.saveRegisteredUserInfo(null);
            }, (err) => {
              console.log('unable to save user attributes', err);
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
      if (err.code === 'ExpiredCodeException') {
        this.error = 'Verification code is expired. Please check your email for new code.';
        this.resendCode();
      } else if (err.code === 'UserNotFoundException') {
        this.error = 'User does not exist.';
      } else if (err.code === 'NotAuthorizedException' && err.message === 'User cannot confirm because user status is not UNCONFIRMED.') {
        this.error = 'Already verified. Please sign in to continue.';
      } else {
        this.error = err.message;
      }
    });
  }

  resendCode(): void {
    Auth.resendSignUp(this.form.controls.email.value).then(data => {
      console.log(data);
      this.form.get('code').patchValue('');
    }).catch(err => {
      console.log(err);
    });
  }

   keyDownFunction(event) {
    if (this.shared.getOs() === 'windows') {
      if (event.keyCode === 13 && this.form.valid) {
        this.verifyAccount();
      }
    } else if (this.shared.getOs() === 'mac') {
       if ((event.keyCode === 76 || event.keyCode === 36) && this.form.valid) {
        this.verifyAccount();
       }
    }
  }


}
