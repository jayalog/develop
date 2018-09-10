import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fury-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {


  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {}

  openSnackBar(message: string, action?: string, duration?: number) {
    this.snackBar.open(message, action || 'X', {
      duration: duration || 5000,
    });
  }

}
