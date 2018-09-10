import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { OtherRoles } from '../shared/profile.interface';
import { role } from '../../data/role';
import { countries } from '../../data/country';

@Component({
  selector: 'fury-otherroles-popup',
  templateUrl: './otherrolesPopup.component.html',
  styleUrls: ['./otherrolesPopup.component.scss']
})
export class OtherRolesPopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  roles: string[];
  otherRoles: OtherRoles = new OtherRoles();
  time: string[];
  countries: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<OtherRolesPopupComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.roles = role;
    this.otherRoles = this.data.data;
    this.time = ['per hour', 'per day', 'per project'];
    this.countries = countries;
  }

  ngOnInit() {
    console.log(this.otherRoles);

    this.form = this.fb.group({
      role: [this.otherRoles.role || '', Validators.required],
      currency: [this.otherRoles.currency || ''],
      budget: [this.otherRoles.budget || ''],
      timerange: [this.otherRoles.timerange || '']
    });
  }

  close(): void {
    this.dialogRef.close();
  }


  saveForm() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
