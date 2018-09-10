import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { v1 as uuid } from 'uuid';
import { countries } from '../../data/country';
import { role } from '../../data/role';
import { Experience } from '../shared/profile.interface';

@Component({
  selector: 'fury-customer-create-update',
  templateUrl: './expInfoPopup.component.html',
  styleUrls: ['./expInfoPopup.component.scss']
})
export class ExpInfoComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  filteredCountries: Object[] = [];
  filteredroles: Object[] = [];
  filteredSecRoles: Object[] = [];
  experienceInfo: Experience;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  dateMessage = '';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ExpInfoComponent>,
    private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.experienceInfo = data.experienceInfo;
    this.filteredCountries = countries;
    this.filteredroles = this.filteredSecRoles = role.sort();
  }

  ngOnInit() {
    console.log(this.experienceInfo);
    let id: string;
    this.isEdit ? id = this.data.experienceInfo.id : id = uuid();
    const fromDt = this.experienceInfo.from || ((new Date()).toISOString());
    const toDt = this.experienceInfo.to || ((new Date()).toISOString());
    console.log(fromDt, toDt);
    this.form = this.fb.group({
      id: id,
      companyname: [this.experienceInfo.companyname, Validators.required],
      companyurl: [this.experienceInfo.companyurl],
      from: [new Date(fromDt.toString())],
      to: [new Date(toDt.toString())],
      city: [this.experienceInfo.city],
      country: [this.experienceInfo.country],
      role: [this.experienceInfo.role, Validators.required],
      type: [this.experienceInfo.type || 'fulltime']
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  filterRoles(val): void {   // auto complete filter function
    this.filteredroles = role.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  filterCountries(val): void {   // auto complete filter function
    this.filteredCountries = countries.filter(option => option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  saveForm(e) {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }
    // const from = this.form.value.from;
    // const to = this.form.value.to;
    const fromDate = moment(this.form.value.from).format('MM/DD/YYYY');
    const toDate = moment(this.form.value.to).format('MM/DD/YYYY');
    if (moment(fromDate).isAfter(toDate)) {
      this.dateMessage = 'From Date cannot be greater than To Date';
      return;
    }
    const form = { ...this.form.value, from: fromDate, to: toDate };
    this.dialogRef.close(form);
  }

}
