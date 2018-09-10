import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as countryCity from 'country-city';

import { Location } from '../shared/profile.interface';
import { countries } from '../../data/country';

@Component({
  selector: 'fury-locaion-popup',
  templateUrl: './locationsPopup.component.html',
  styleUrls: ['./locationsPopup.component.scss']
})
export class LocationPopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  location: Location = new Location();
  countriesList: Object[] = [];
  cities: Array<string>;
  // filteredcities: Array<string>;
  // country: Language;
  // city: String[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<LocationPopupComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    if (this.data.location) {
      this.location = this.data.location;
      this.cities = countryCity.getCities(this.data.location.country);
      this.cities ? this.cities = this.cities.sort() : null;
    }
    this.countriesList = countries;
    // this.language = data.lo;
    // this.proficiency = ['Native', 'Fluent', 'Professional', 'Limited'];
    // this.languagesList = languages;
  }

  ngOnInit() {
    this.form = this.fb.group({
      country: [this.location.country || '', Validators.required],
      city: [this.location.city || '' , Validators.required],
    });

    if (!(this.location && this.location.country)) {
      this.form.controls.city.disable();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getCities(val): void {
    this.cities = countryCity.getCities(val);
    this.cities = this.cities.sort();
    this.form.controls.city.enable();
  }


  saveForm() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
