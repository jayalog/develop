import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TeamDetails } from '../add-project-modal/team-details-vo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mobilePattern } from '../../../validators/mobile.validator';

@Component({
  selector: 'fury-add-team-modal',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  addTeamForm: FormGroup;
  teamVo: TeamDetails;
  roles: any[] = [];
  filteredRoles: any[];
  constructor(public dialogRef: MatDialogRef<AddTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.addTeamForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.pattern(mobilePattern)]],
      email: ['', [Validators.email, Validators.required]],
      role: ['', [Validators.required]],
      // description: [''],
      // workLink: ['']
    });
    if (this.teamVo) {
      this.addTeamForm.setValue(this.teamVo);
    }
    this.filteredRoles = JSON.parse(JSON.stringify(this.roles));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addTeam() {
    if (this.addTeamForm.valid) {
      const formData = this.addTeamForm.value;
      this.dialogRef.close(formData);
    }

  }
  filterData(val): void {   // auto complete filter function
    this.filteredRoles = this.roles.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  cancel() {
    this.dialogRef.close();
  }

}

@Injectable()
export class AddTeamModal {
  private dialogRef: MatDialogRef<AddTeamComponent>;
  constructor(public dialog: MatDialog) { }

  open(): MatDialogRef<AddTeamComponent> {
    this.dialogRef = this.dialog.open(AddTeamComponent, {
      disableClose: true,
      data: {}
    });
    return this.dialogRef;
  }
}
