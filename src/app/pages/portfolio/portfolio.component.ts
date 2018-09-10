import { Component, OnInit } from '@angular/core';
import { role } from '../data/role';
import { countries } from '../data/country';
import { categories } from '../data/category';
import { languages } from '../data/languages';
import { genres } from '../data/genres';
import { industries } from '../data/industry';
import { AddProjectModal } from './add-project-modal/add-project-modal.component';
import { DeleteConfirmationPopup } from './delete-confirmation/delete-confirmation.component';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { ApiService } from '../../services/api.service';
import { LocalStorage } from '../../services/localstorage.service';
import { Profile } from '../profile/shared/profile.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'fury-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' },
  providers: [ApiService]
})
export class PortfolioComponent implements OnInit {
  portfolio: any = [];
  dialogRef: any;
  isLoading = false;
  profileInfo: Profile;
  creatorId: any;
  projectIndex = -1;
  successMessage: string;

  constructor(private api: ApiService, private addProjectModal: AddProjectModal, private deleteConifrmModal: DeleteConfirmationPopup, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.creatorId = LocalStorage.getObject('userProfile')['custom:UID'];
    this.isLoading = true;
    this.getProfile();
  }

  getProfile(): void {
    this.api.getProfile(this.creatorId).then((res: Profile) => {
      console.log('profile res', res);
      this.profileInfo = res;
      // this.fetchThumbnails();
      this.portfolio = this.profileInfo.portfolio;
      this.isLoading = false;
    }, (err => {
      console.log('err', err);
      if (err.response.status === 404) {
        console.log('new user, profile to be created.');
      }
      this.isLoading = false;
    }));

  }

  // fetchThumbnails() {
  //   this.portfolio.forEach(function(project) {
  //     if (project.url.indexOf('youtube') !== -1) {
  //       let id = project.url.match(/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/);
  //       console.log('youtubeid', id);
  //       // project['thumbnail'] =
  //     } else if (project.url.indexOf('vimeo')) {

  //     }
  //   });
  // }

  saveProfile(): void {
    this.isLoading = true;
    this.profileInfo.identityid = this.creatorId;
    console.log('this.profileInfo.id', this.profileInfo.identityid);
    this.api.postProfile(this.profileInfo).then((res: Profile) => {
      console.log('res', res);
      this.profileInfo = res;
      this.refereshProfile();
      this.isLoading = false;
      this.toastr.success(this.successMessage, 'Success');
    }, (err => {
      this.isLoading = false;
      console.log('err', err);
    }));
  }

  onDeleteProject(index) {
    this.projectIndex = index;
    this.dialogRef = this.deleteConifrmModal.open();
    this.dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteProject();
      }
      this.projectIndex = -1;
    });
  }

  deleteProject() {
    this.profileInfo.portfolio.splice(this.projectIndex, 1);
    this.successMessage = "Project deleted successfully";
    this.saveProfile();
  }
  onAddProject(index = -1) {
    this.dialogRef = this.addProjectModal.open();
    if (index !== -1) {
      this.dialogRef.componentInstance.projectVo = this.profileInfo.portfolio[index];
      this.projectIndex = index;
    }
    this.dialogRef.componentInstance.roles = role;
    this.dialogRef.componentInstance.countries = countries;
    this.dialogRef.componentInstance.categories = categories;
    this.dialogRef.componentInstance.languages = languages;
    this.dialogRef.componentInstance.genres = genres;
    this.dialogRef.componentInstance.industries = industries;
    this.dialogRef.afterClosed().subscribe((res: any) => {

      if (res) {
        this.onAddProjectClick(res);
      }
    });
  }

  onAddProjectClick(projectDetails) {
    const portFolioItem = projectDetails.formData;
    portFolioItem.team = projectDetails.teamDetails;
    if (this.projectIndex !== -1) {
      this.profileInfo.portfolio[this.projectIndex] = portFolioItem;
      this.projectIndex = -1;
      this.successMessage = portFolioItem.title + " updated successfully";
    } else {
      if (!this.profileInfo.portfolio) {
        this.profileInfo.portfolio = [];
      }
      this.profileInfo.portfolio.unshift(portFolioItem);
      this.successMessage = "Project added successfully";
    }
    this.saveProfile();
  }

  refereshProfile() {
    let profileData = JSON.parse(JSON.stringify(this.profileInfo));
    this.profileInfo = profileData;
    this.portfolio = this.profileInfo.portfolio;
  }
}
