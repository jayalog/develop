import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Links } from '../shared/profile.interface';
import { urlPattern } from '../../../validators/url.validator';

@Component({
  selector: 'fury-sociallinks-edit',
  templateUrl: './socialLinks.component.html',
  styleUrls: ['./socialLinks.component.scss']
})
export class socialLinksComponent implements OnInit {

  form: FormGroup;
  links: Links = new Links();

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<socialLinksComponent>, private fb: FormBuilder) {
    if (this.data.data) {
      this.links = this.data.data;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      website: [this.links.website || null, Validators.pattern(urlPattern)],
      facebook: [this.links.facebook || null, Validators.pattern(urlPattern)],
      twitter: [this.links.twitter || null, Validators.pattern(urlPattern)],
      linkedin: [this.links.linkedin || null, Validators.pattern(urlPattern)],
      instagram: [this.links.instagram || null, Validators.pattern(urlPattern)],
      youtube: [this.links.youtube || null, Validators.pattern(urlPattern)],
      vimeo: [this.links.vimeo || null, Validators.pattern(urlPattern)],
      behance: [this.links.behance || null, Validators.pattern(urlPattern)],
      others: [this.links.others  || null, Validators.pattern(urlPattern)]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    let obj = this;
    Object.keys(this.form.value).map(function (key) {
      obj.form.value[key] === "" ? obj.form.value[key] = null : obj.form.value[key] = obj.form.value[key];
    });
    this.dialogRef.close(this.form.value);
  }


}
