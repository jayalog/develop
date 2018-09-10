import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SnackbarComponent
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SnackbarModule { }
