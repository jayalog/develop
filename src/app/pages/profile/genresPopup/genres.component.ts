import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { genres } from '../../data/genres';

@Component({
  selector: 'fury-genre-edit',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  addedChips: string[];
  genreList: string[] = genres;
  hint: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GenresComponent>) {
  }

  ngOnInit() {
    this.addedChips = this.data.data || [];
    this.hint = 'Start type the genre to add. Up to 10 genres can be added.';
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
