import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Reference } from '../shared/profile.interface';

@Component({
  selector: 'fury-reference-popup',
  templateUrl: './referencesPopup.component.html',
  styleUrls: ['./referencesPopup.component.scss']
})
export class ReferencePopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  reference: Reference;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReferencePopupComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.reference = data.reference;
  }

  ngOnInit() {
    console.log(this.reference);
    this.form = this.fb.group({
      name: [this.reference.name, Validators.required],
      mobile: [this.reference.mobile, Validators.required],
      email: [this.reference.email, [Validators.required, Validators.email]],
      role: [this.reference.role, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }


  saveForm() {
    console.log(1);
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
