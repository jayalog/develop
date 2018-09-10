import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
// import * as countryCity from 'country-city';

import { role } from '../../data/role';
import { countries } from '../../data/country';
import { mobilePattern } from '../../../validators/mobile.validator';
import { Rate } from '../shared/profile.interface';
import * as countryCity from 'country-city';
@Component({
  selector: 'fury-personal-edit',
  templateUrl: './personalInfoPopup.component.html',
  styleUrls: ['./personalInfoPopup.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  static id = 100;
  isEdit: boolean;
  form: FormGroup;
  filteredCountries: Object[] = [];
  filteredroles: Object[] = [];
  filteredSecRoles: Object[] = [];
  secRoles: Object[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rate: Rate;
  sliderDefaultValues = {
      'min': 100,
      'max': 10000
    };
  cities: Array<string> = [];
  filteredcities: Array<string> = [];
  mobile: string;
  code: string;

  @ViewChild('secRoleInput') secRoleInput: ElementRef;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PersonalInfoComponent>,
    private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.filteredCountries = countries;
    this.filteredroles = this.filteredSecRoles = role.sort();
    this.mobile = this.data.data.mobile.split(' ')[1];
    this.code = this.data.data.mobile.split(' ')[0];
  }

  ngOnInit() {
    this.form = this.fb.group({
      brandname: [this.data.data.brandname || null],
      brandurl: [this.data.data.brandurl || null],
      name: [this.data.data.name, [Validators.required]],
      email: [{ 'value': this.data.data.email, disabled: true }],
      mobile: [this.mobile, [Validators.required, Validators.pattern(mobilePattern)]],
      role: [this.data.data.role],
      otherroles: [''],
      // otherrole: [{'value':'', disabled: true}],
      rate: [''],
      country: [this.data.data.country],
      city: [this.data.data.city],
      address: [this.data.data.address],
      description: [this.data.data.description]
    });

    this.secRoles = this.data.data.otherroles || [];
    this.rate = this.data.data.rate;

    this.cities = countryCity.getCities(this.data.data.country);
    this.cities ? this.filteredcities = this.cities = this.cities.sort() : null;
  }

  close(): void {
    this.dialogRef.close();
  }

  add(_data) {

  }

  findCountrycode(): string {
    let country;
    country = countries.filter(a => {
     return a.name === this.form.controls.country.value;
    });
    return (country[0] && country[0].code) || null;
  }

  filterRoles(val): void {   // auto complete filter function
    this.filteredroles = role.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterCountries(val): void {   // auto complete filter function
   // this.filteredCountries = countries.filter(option => option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
    this.cities = countryCity.getCities(val);
    this.filteredcities = this.cities = this.cities.sort();
    // this.form.controls.city.enable();
  }

  filterSecRoles(event): void {  // auto complete filter function
    // const input = event.input;
    // const value = event;

    // if ((value || '').trim()) {
    //   this.secRoles.push(value.trim());
    // }

    // if (input) {
    //   input.value = '';
    // }
    this.filteredSecRoles = role.filter(option => option.toLowerCase().indexOf(event.toLowerCase()) === 0);
  }

   filterCities(_val): void {
   // this.filteredcities = this.cities.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }


  roleSelected(event: MatAutocompleteSelectedEvent): void {
    this.secRoles.push(event.option.viewValue);
    // this.filteredSecRoles = role.sort();
    this.secRoleInput.nativeElement.value = '';
    this.form.get('otherroles').patchValue('');
  }

  removeRole(role): void { // delete chips
    const index = this.secRoles.indexOf(role);

    if (index >= 0) {
      this.secRoles.splice(index, 1);
    }
  }

  onHourlyRateChange(_data) {
    console.log('rate cange', _data);
    this.rate = _data;
  }

  saveForm() {
    console.log(this.form.value);
    this.code = this.findCountrycode();
    this.form.value.otherroles = this.secRoles;
    this.form.value.rate = this.rate;
    this.form.value.mobile = this.code + ' '  + this.form.value.mobile;
    this.dialogRef.close(this.form.value);
  }

}
