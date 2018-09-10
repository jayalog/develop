import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

import { fadeOutAnimation } from '../../core/common/route.animation';
import { AwsService } from '../../services/aws.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeOutAnimation]': 'true'
  },
  animations: [fadeOutAnimation],
  // providers: [AwsService]
})
export class LoginComponent implements OnInit {

  @ViewChild('email') email: ElementRef;

  form: FormGroup;

  inputType = 'password';
  visible = false;
  error: string;
  isLoading = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef, private awsservice: AwsService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.email.nativeElement.focus();
  }

  send() {
    console.log(this.form.value);
    this.isLoading = true;
    Auth.signIn(this.form.value.email, this.form.value.password)
      .then(user => {
        this.error = '';
        // this.saveUserAttr(user);
        this.awsservice.saveUserAttr(user).then((res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/']);
        }, (err) => {
          console.log('unable to save user attributes', err);
        });
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
        this.displayErrors(err);
      });
  }

  displayErrors(err) {
    if (err.code === 'NetworkError') {
      this.error = 'NetworkError error occured. Please try again.';
    } else if (err.code === 'UserNotConfirmedException') {
      this.error = 'Email id is not verified. Please verify and try again.';
    } else if (err.code === 'UserNotFoundException') {
      this.error = 'User does not exist.';
    } else if (err.code === 'NotAuthorizedException') {
      this.error = 'Incorrect password. Please try again.';
    } else {
      this.error = err.message;
    }
  }

  saveUserAttr(user) {
    this.awsservice.saveUserAttr(user);
  }

  show() {
    this.inputType = 'text';
    this.visible = true;
    this.cd.markForCheck();
  }

  hide() {
    this.inputType = 'password';
    this.visible = false;
    this.cd.markForCheck();
  }

  keyDownFunction(event) {
    // console.log('os', this.shared.getOs());
    // console.log('event key code', event.keyCode);
    // if (this.shared.getOs() === 'windows') {
      if (event.keyCode === 13 && this.form.valid) {
        this.send();
      }
    // } else if (this.shared.getOs() === 'mac') {
    //    if ((event.keyCode === 13) && this.form.valid) {
    //     this.send();
    //    }
    // }
  }
}
