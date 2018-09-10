import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteTrigger } from '@angular/material';

import { categories } from '../../data/category';

@Component({
  selector: 'fury-category-edit',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  addedChips: string[];
  categoryList: string[] = categories;
  hint: string;

  @ViewChild('Input') input: ElementRef;
  @ViewChild('Input', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CategoriesComponent>) { }

  ngOnInit() {
    this.addedChips = this.data.data || [];
    this.hint = 'Start type the category to add. Up to 10 categories can be added.';
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
