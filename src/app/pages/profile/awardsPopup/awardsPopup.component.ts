import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Awards } from '../shared/profile.interface';

@Component({
  selector: 'fury-awards-popup',
  templateUrl: './awardsPopup.component.html',
  styleUrls: ['./awardsPopup.component.scss']
})
export class AwardsPopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  awards: Awards;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AwardsPopupComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.awards = data.awards;
  }

  ngOnInit() {
    console.log(this.awards);

    this.form = this.fb.group({
      name: [this.awards.name, Validators.required],
      category: [this.awards.category],
      type: [this.awards.type],
      date: [new Date(this.awards.date)],
      client: [this.awards.client],
      url: [this.awards.url]
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
