import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-industry-edit',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  addedChips: string[];
  hint: string;
  toolsList: string[] = [];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ToolsComponent>) {
  }

  ngOnInit() {
    this.addedChips = this.data.data || [];
    this.hint = 'Start type the tool name to add. Up to 10 tools can be added.';
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
