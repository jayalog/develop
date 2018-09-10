import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipListComponent } from './chiplist.component';
import { MaterialModule } from '../material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChipListComponent
  ],
  exports: [
    ChipListComponent
  ]
})
export class ChipListModule { }
