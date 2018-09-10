import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { MatStepper } from '@angular/material';

import { fadeOutAnimation } from '../../core/common/route.animation';
import { passwordPAttern } from '../../validators/password.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    '[@fadeOutAnimation]': 'true'
  },
  animations: [fadeOutAnimation]
})
export class ForgotPasswordComponent implements OnInit {

  sendCodeFormGroup: FormGroup;
  resetpasswordFormGroup: FormGroup;
  passwordPAttern: any;
  inputType = 'password';
  visible = false;
  isLoading = false;
  error: string;

  constructor(private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef, private toaster: ToastrService) {
    this.passwordPAttern = passwordPAttern;
  }

  ngOnInit() {

    this.sendCodeFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetpasswordFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPAttern)]]
    });

  }

  sendCode(stepper: MatStepper) {
    this.isLoading = true;

    Auth.forgotPassword(this.sendCodeFormGroup.controls.email.value)
      .then(data => {
        this.error = '';
        console.log(data);
        this.toaster.info('Please check registered email id for verification code.');
        stepper.next();
        this.resetpasswordFormGroup.patchValue({
          email: this.sendCodeFormGroup.controls.email.value,
          code: ''
        });
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.displayErrors(err);
      });

    this.error = '';
    // stepper.next();
    // this.resetpasswordFormGroup.patchValue({
    //   email: this.sendCodeFormGroup.controls.email.value,
    //   code: ''
    // });
    // this.isLoading = false;

  }

  displayErrors(err): void {

    if (err.code === 'UserNotFoundException') {
      this.error = 'User does not exist.';
    } else if (err.code === 'InvalidParameterException') {
      this.error = 'Email id is not verified. Please verify and try again.';
    } else {
      this.error = err.message;
    }
  }


  setNewPass() {
    this.isLoading = true;
    const username = this.resetpasswordFormGroup.controls.email.value;
    const code = this.resetpasswordFormGroup.controls.code.value;
    const new_password = this.resetpasswordFormGroup.get('password').value;
    Auth.forgotPasswordSubmit(username, code, new_password)
      .then(data => {
        console.log(data);
        this.isLoading = false;
        this.toaster.success('Password reset successful, Please sign in to continue.');
        this.router.navigate(['/login']);

      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.displayErrors(err);
      });
  }

  showPassword() {
    this.inputType = 'text';
    this.visible = true;
    this.cd.markForCheck();
  }

  hidePassword() {
    this.inputType = 'password';
    this.visible = false;
    this.cd.markForCheck();
  }
}
