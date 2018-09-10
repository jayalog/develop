import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countryCity from 'country-city';

import { TeamDetails } from './team-details-vo';
import { AddTeamModal } from '../add-team/add-team.component';
import { v1 as uuid } from 'uuid';
import { urlPattern } from '../../../validators/url.validator';

@Component({
  selector: 'fury-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {
  roles: any[] = [];
  countries: any[] = [];
  categories: any[] = [];
  languages: any[] = [];
  periodTypes: any[] = [{ "name": 'Days', "code": 'days' }, { "name": 'Months', "code": 'months' }, { "name": 'Years', "code": 'years' }];
  genres: any[] = [];
  industries: any[] = [];
  teamColumns: string[] = ["name", "role", "phone", "email", 'action'];
  team: TeamDetails[] = [];
  addProjectForm: FormGroup;
  addTeamDialogRef: any;
  teamVo: TeamDetails;
  projectVo: any;
  filteredGenres: any;
  filteredIndustries: any;
  filteredRoles: any;
  filteredCategories: any;
  filteredLanguages: any;
  filteredCountries: any;
  cities: Array<string> = [];
  filteredcities: Array<string> = [];
  constructor(public dialogRef: MatDialogRef<AddProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private addTeamModal: AddTeamModal) { }

  ngOnInit() {
    this.addProjectForm = this.fb.group({
      id: [uuid()],
      // urltype: ['internal'],
      title: ['', [Validators.required]],
      description: [null],
      url: ['', [Validators.pattern(urlPattern), Validators.required]],
      client: [null],
      // company: [null],
      role: [null, [Validators.required]],
      industry: [null],
      // thumbnailurl: ['/assets/img/backgrounds/background.jpg'],
      // city: [{ 'value': null, disabled: true }],
      // country: [null],
      // duration: [''],
      // date: [null],
      // genre: [null],
      category: [null, [Validators.required]],
      // language: [null],
      // team: [null]
    });
    if (this.projectVo) {
      // let value = Object.assign({}, this.projectVo, { 'city': null });
      // this.addProjectForm.setValue(value);
      // this.team = this.projectVo.team;
      this.addProjectForm.get('title').setValue(this.projectVo.title) || null;
      this.addProjectForm.get('description').setValue(this.projectVo.description) || null;
      this.addProjectForm.get('url').setValue(this.projectVo.url) || null;
      this.addProjectForm.get('client').setValue(this.projectVo.client) || null;
      this.addProjectForm.get('role').setValue(this.projectVo.role) || null;
      this.addProjectForm.get('industry').setValue(this.projectVo.industry) || null;
      this.addProjectForm.get('category').setValue(this.projectVo.category) || null;
    }
    this.filteredGenres = JSON.parse(JSON.stringify(this.genres));
    this.filteredRoles = JSON.parse(JSON.stringify(this.roles));
    this.filteredCategories = JSON.parse(JSON.stringify(this.categories));
    this.filteredLanguages = JSON.parse(JSON.stringify(this.languages));
    this.filteredCountries = JSON.parse(JSON.stringify(this.countries));
    this.filteredIndustries = JSON.parse(JSON.stringify(this.industries));
  }

  filterData(val, type): void {   // auto complete filter function
    switch (type) {
      case 'genre':
        this.filteredGenres = this.genres.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
        break;
      case 'industry':
        this.filteredIndustries = this.industries.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
        break;
      case 'role':
        this.filteredRoles = this.roles.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
        break;
      case 'category':
        this.filteredCategories = this.categories.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
        break;
      // case 'language':
      //   this.filteredLanguages = this.languages.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
      //   break;
      case 'country':
        this.filteredCountries = this.countries.filter(option => option['name'].toLowerCase().indexOf(val.toLowerCase()) === 0);
        this.cities = countryCity.getCities(val);
        this.filteredcities = this.cities = this.cities.sort();
        this.addProjectForm.controls.city.enable();
        break;
      case 'city':
        this.filteredcities = this.cities.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
        break;

    }

  }


  loadVideo(event): void {
    console.log('file details', event);
  }

  addProject() {
    if (this.addProjectForm.valid) {
      const formData = { formData: this.addProjectForm.value, teamDetails: this.team };
      this.dialogRef.close(formData);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
  addTeam() {
    this.addTeamDialogRef = this.addTeamModal.open();
    this.addTeamDialogRef.componentInstance.roles = this.roles;
    this.addTeamDialogRef.afterClosed().subscribe((res: any) => {

      if (res) {
        this.onAddTeamClick(res);
      }
    });
  }

  updateRow(value, index) {
    this.addTeamDialogRef = this.addTeamModal.open();
    this.addTeamDialogRef.componentInstance.roles = this.roles;
    this.addTeamDialogRef.componentInstance.teamVo = value;
    this.addTeamDialogRef.afterClosed().subscribe((res: any) => {

      if (res) {
        this.team[index] = res;
        this.refereshTeamDetails();
      }
    });
  }

  deleteRow(index) {
    this.team.splice(index, 1);
    this.refereshTeamDetails();
  }
  onCancel() {
    this.addTeamDialogRef.close();
  }
  onAddTeamClick(value) {
    const team = value;
    this.team.push(team);
    this.refereshTeamDetails();
  }

  refereshTeamDetails() {
    const teamDetails = JSON.stringify(this.team);
    this.team = JSON.parse(teamDetails);
    this.onCancel();
  }

}

@Injectable()
export class AddProjectModal {
  private dialogRef: MatDialogRef<AddProjectModalComponent>;
  constructor(public dialog: MatDialog) { }

  open(): MatDialogRef<AddProjectModalComponent> {
    this.dialogRef = this.dialog.open(AddProjectModalComponent, {
      disableClose: true,
      panelClass: 'dialog-wide'
    }
    );
    return this.dialogRef;
  }
}
