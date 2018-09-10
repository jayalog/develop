import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { industries } from '../../data/industry';

@Component({
  selector: 'fury-industry-edit',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {

  addedChips: string[];
  industryList: string[] = industries;
  hint: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IndustriesComponent>) {
  }

  ngOnInit() {
    this.addedChips = this.data.data || [];
    this.hint = 'Start type the industry to add. Up to 10 industries can be added.';
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.addedChips);
  }

  getCurChips(val) {
    this.addedChips = val;
  }

}
