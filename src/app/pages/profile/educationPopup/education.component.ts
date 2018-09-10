import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-category-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EducationComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
  }

  ngOnInit() {
    this.form = this.fb.group({
      education: [this.data.data],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  saveForm() {
    this.dialogRef.close(this.form.get('education').value);
  }

}
