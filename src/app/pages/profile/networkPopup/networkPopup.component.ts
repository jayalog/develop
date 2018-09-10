import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { v1 as uuid } from 'uuid';
import { mobilePattern } from '../../../validators/mobile.validator';
import { role } from '../../data/role';
import { Network } from '../shared/profile.interface';

@Component({
  selector: 'fury-network-popup',
  templateUrl: './networkPopup.component.html',
  styleUrls: ['./networkPopup.component.scss']
})
export class NetworkInfoComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  filteredroles: Object[] = [];
  filteredSecRoles: Object[] = [];
  networkInfo: Network;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NetworkInfoComponent>,
    private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.networkInfo = data.networkInfo;
    this.filteredroles = this.filteredSecRoles = role.sort();
  }

  ngOnInit() {
    let id: string;
    this.isEdit ? id = this.data.networkInfo.id : uuid();

    this.form = this.fb.group({
      id: id,
      name: [this.networkInfo.name, Validators.required],
      // url: [this.networkInfo.url],
      email: [this.networkInfo.email, [Validators.required, Validators.email]],
      mobile: [this.networkInfo.mobile, [Validators.required, Validators.pattern(mobilePattern)]],
      role: [this.networkInfo.role, Validators.required],
      // description: [this.networkInfo.description]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  filterRoles(val): void {   // auto complete filter function
    this.filteredroles = role.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  saveForm(e) {
    e.preventDefault();
    if (this.form.invalid) {
      return;
    }
    const form = { ...this.form.value };
    this.dialogRef.close(form);
  }

}
