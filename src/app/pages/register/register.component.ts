import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { v1 as uuid } from 'uuid';
import * as countryCity from 'country-city';

import { AwsService } from '../../services/aws.service';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { countries } from '../data/country';
import { role } from '../data/role';
import { passwordPAttern } from '../../validators/password.validator';
import { mobilePattern } from '../../validators/mobile.validator';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeOutAnimation]': 'true'
  },
  animations: [fadeOutAnimation]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  passwords: FormGroup;
  isLoading = false;
  inputType = 'password';
  visible = false;
  mobilePattern: any;
  passwordPAttern: any;
  filteredCountries: Object[] = [];
  filteredroles: Object[] = [];
  cities: Array<string>;
  filteredcities: Array<string>;
  error: string;
  terms = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef, private awsservice: AwsService, private toaster: ToastrService, private shared: SharedDataService
  ) {
    this.mobilePattern = mobilePattern;
    this.passwordPAttern = passwordPAttern;
    // countries.forEach(element => {
    //   element.name = element.name + '(' + element.code + ')';
    // });
    this.filteredCountries = countries;
    this.filteredroles = role.sort();
  }

  ngOnInit() {

    this.passwords = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(this.passwordPAttern)]]
    });

    this.form = this.fb.group({
      usertype: ['creator'],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      role: ['', Validators.required],
      passwords: this.passwords,
      country: [''],
      city: [{ 'value': '', disabled: true }, Validators.required],
      terms: ['', Validators.required]
    });

    this.form.get('usertype').valueChanges.subscribe(val => {
      console.log('val', val);
      if (val === 'brand') {
        this.form.addControl('brandname', new FormControl('', Validators.required));
        // this.form.addControl('brandurl', new FormControl('', Validators.required));
      } else {
        this.form.removeControl('brandname');
        // this.form.removeControl('brandurl');
      }
    });

    // console.log('countries', countryCity.getCountries());

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

  signup(): void {
    console.log(this.form.controls.email);
    if (!this.terms) {
      this.error = "Please accept terms of services.";
      return;
    }
    this.isLoading = true;
    const country = this.form.controls.country.value;
    const countrycode = this.findCountrycode();
    if (!countrycode) {
      this.error = "Country is not valid, Please choose the country from dropdown.";
      this.isLoading = false;
      return;
    }

    let attributes = {
      'email': this.form.controls.email.value,
      'given_name': this.form.controls.name.value,
      'family_name': 'creator',
      'custom:UID': uuid(),
      'custom:Role': this.form.controls.role.value,
      'custom:Mobile': countrycode + ' ' + this.form.controls.mobile.value,
      'custom:Type': this.form.controls.usertype.value,
      'custom:City': this.form.controls.city.value || null,
      'custom:Country': country
    };

    if (this.form.controls.usertype.value === 'brand') {
      attributes['custom:BrandName'] = this.form.controls.brandname.value;
    }
    Auth.signUp({
      'username': this.form.controls.email.value,
      'password': this.form.get('passwords').get('password').value,
      'attributes': attributes
    })
      .then(data => {
        this.error = '';
        console.log(data);
        this.awsservice.saveRegisteredUserInfo({
          'username': this.form.controls.email.value,
          'password': this.form.get('passwords').get('password').value
        });
        // LocalStorage.set('verify-username', this.form.controls.email.value);
        this.isLoading = false;
        this.toaster.success('signup successfull. Verify account to continue.');
        this.router.navigate(['/verify']);
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        this.displayErrors(err);
      });
  }

  findCountrycode(): string {
    let country;
    country = countries.filter(a => {
      return a.name === this.form.controls.country.value;
    });
    return (country[0] && country[0].code) || null;
  }

  displayErrors(err) {
    if (err.code === 'NetworkError') {
      this.error = 'NetworkError error occured. Please try again.';
    } else if (err.code === 'UsernameExistsException') {
      this.error = 'Email Id already registered.';
    } else {
      this.error = err.message;
    }
  }

  filterCountries(val): void {
    // this.filteredCountries = countries.filter(option => option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
    this.cities = countryCity.getCities(val);
    this.filteredcities = this.cities = this.cities.sort();
    this.form.controls.city.enable();
  }

  // filterCountries(val): void {
  //   this.filteredCountries = countries.filter(option => option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
  //   this.cities = countryCity.getCities(val);
  //   this.filteredcities = this.cities = this.cities.sort();
  //   this.form.controls.city.enable();
  // }

  // filterCities(val): void {
  //   this.filteredcities = this.cities.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  // }

  filterRoles(val): void {
    this.filteredroles = role.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  keyDownFunction(event) {
    if (this.shared.getOs() === 'windows') {
      if (event.keyCode === 13 && this.form.valid) {
        this.signup();
      }
    } else if (this.shared.getOs() === 'mac') {
      if ((event.keyCode === 76 || event.keyCode === 36) && this.form.valid) {
        this.signup();
      }
    }
  }

  acceptTerms(_val: any) {
    this.terms = _val.checked;
  }
  // roleKeyDownFunction(event) {
  //   if (this.form.get('role').value !== '') {
  //     this.keyDownFunction(event);
  //   }
  // }

}
