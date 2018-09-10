import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Language } from '../shared/profile.interface';
import { languages } from '../../data/languages';

@Component({
  selector: 'fury-languages-popup',
  templateUrl: './languagesPopup.component.html',
  styleUrls: ['./languagesPopup.component.scss']
})
export class LanguagesPopupComponent implements OnInit {

  isEdit: boolean;
  form: FormGroup;
  languagesList: string[];
  language: Language;
  proficiency: String[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<LanguagesPopupComponent>, private fb: FormBuilder) {
    this.isEdit = this.data.isEdit;
    this.language = data.language;
    this.proficiency = ['Native', 'Fluent', 'Professional', 'Limited'];
    this.languagesList = languages;
  }

  ngOnInit() {
    console.log(languages);

    this.form = this.fb.group({
      name: [this.language.name, Validators.required],
      proficiency: [this.language.proficiency],
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
