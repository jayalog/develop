import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'fury-delete-confirm-modal',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  confirmationText = "Are you sure you want to delete the project?";
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  yesClick() {
    this.dialogRef.close(true);

  }
  noClick() {
    this.dialogRef.close();
  }

}

@Injectable()
export class DeleteConfirmationPopup {
  private dialogRef: MatDialogRef<DeleteConfirmationComponent>;
  constructor(public dialog: MatDialog) { }

  open(): MatDialogRef<DeleteConfirmationComponent> {
    this.dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '30%',
      disableClose: true,
      data: {}
    });
    return this.dialogRef;
  }
}
