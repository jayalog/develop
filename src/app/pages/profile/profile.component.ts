import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AvatarPopupComponent } from './avatarPopup/avatarPopup.component';
import { fadeOutAnimation } from '../../core/common/route.animation';
import { ApiService } from '../../services/api.service';
import {SharedDataService} from '../../services/shared-data.service';
import { ExpInfoComponent } from './expInfoPopup/expInfoPopup.component';
import { PersonalInfoComponent } from './personalInfoPopup/personalInfoPopup.component';
import { IndustriesComponent } from './industriesPopup/industries.component';
import { CategoriesComponent } from './categoriesPopup/categories.component';
import { ToolsComponent } from './toolsPopup/tools.component';
import { GenresComponent } from './genresPopup/genres.component';
import { EducationComponent } from './educationPopup/education.component';
import { AwardsPopupComponent } from './awardsPopup/awardsPopup.component';
import { ReferencePopupComponent } from './referencesPopup/referencesPopup.component';
import { LanguagesPopupComponent } from './languagesPopup/languagesPopup.component';
import { PaymentPopupComponent } from './paymentPopup/paymentPopup.component';
import { LocationPopupComponent } from './locationsPopup/locationsPopup.component';
import { Profile, Experience, Awards, Reference, Network, Language, Location, OtherRoles } from './shared/profile.interface';
import { LocalStorage } from '../../services/localstorage.service';
import { NetworkInfoComponent } from './networkPopup/networkPopup.component';
import { socialLinksComponent } from './socialLinksPopup/socialLinks.component';
import { OtherRolesPopupComponent } from './otherrolesPopup/otherrolesPopup.component';

@Component({
  selector: 'fury-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' },
  providers: [ApiService]
})


export class ProfileComponent implements OnInit {
  referenceColumn: string[];
  networkColumn: string[];
  awardsColumn: string[];
  profileExpColumns: string[];
  languagesColumns: string[];
  otherLocnColumn: string[];
  otherRolesColumn: string[];

  // experience: MatTableDataSource<Experience> | null;
  // profileInfo: any = profile;
  // profileExperience: any = [];
  languages: any = [];
  profileCalculation: any;

  profileInfo: Profile = new Profile();
  creatorId: string;
  isLoading: boolean;
  currencyType: string;

  constructor(private api: ApiService, private dialog: MatDialog, private sharedService: SharedDataService) {
    this.languages = this.profileInfo.languages;

    this.profileExpColumns = ['name', 'location', 'role', 'duration', 'type', 'action'];
    this.awardsColumn = ['name', 'category', 'type', 'date', 'client', 'url', 'action'];
    this.networkColumn = ['name', 'mobile', 'email', 'role', 'action'];
    this.referenceColumn = ['name', 'mobile', 'email', 'role', 'action'];
    this.otherLocnColumn = ['city', 'country', 'action'];
    this.languagesColumns = ['language', 'proficiency', 'action'];
    this.otherRolesColumn = ['role', 'budget', 'action'];

    this.isLoading = false;
    this.creatorId = LocalStorage.getObject('userProfile')['custom:UID'];
    this.currencyType = 'Rs';
  }

  ngOnInit() {
    this.isLoading = true;
    this.getProfile();
  }

  fetchPercentage(val) {
    console.log(val);
    this.profileInfo.completepercentage = val.toString();
  }

  getProfile(): void {
    this.api.getProfile(this.creatorId).then((res: Profile) => {
      console.log('profile res', res);
      this.profileInfo = res;
      this.sharedService.setProfileImage(this.profileInfo.avatar);
      // this.calculatePercentage(res);
      if (!this.profileInfo.secroles) {
        this.profileInfo.secroles = [];
        let obj: OtherRoles = new OtherRoles();
        obj['role'] = this.profileInfo.role;
        this.profileInfo.secroles[0] = obj;
      }
      this.api.saveProfileInfoObservable(res);
      this.isLoading = false;
    }, (err => {
      console.log('err', err);
      if (err.response.status === 404) {
        console.log('new user, profile to be created.');
        this.getBasicUserInfo();
      }
      this.isLoading = false;
    }));
  }

  getBasicUserInfo(): void {
    const userProfile = LocalStorage.getObject('userProfile');
    this.profileInfo.name = userProfile['given_name'];
    this.profileInfo.email = userProfile['email'];
    this.profileInfo.mobile = userProfile['custom:Mobile'] || null;
    this.profileInfo.identityid = userProfile['custom:UID'];
    this.profileInfo.usertype = userProfile['custom:Type'];
    this.profileInfo.country = userProfile['custom:Country'];
    this.profileInfo.city = userProfile['custom:City'] || null;
    this.profileInfo.role = userProfile['custom:Role'];
    this.profileInfo.brandname = userProfile['custom:BrandName'] || null;
    if (!this.profileInfo.secroles) {
      this.profileInfo.secroles = [];
      let obj: OtherRoles = new OtherRoles();
      obj['role'] = this.profileInfo.role;
      this.profileInfo.secroles[0] = obj;
    }
    this.saveProfile();
  }

  /* Language */

  addLanguage(): void {
    const row = new Language();
    this.dialog.open(LanguagesPopupComponent, {
      data: {
        isEdit: false,
        language: row
      }
    }).afterClosed().subscribe((res: Language) => {
      if (res) {
        const len = this.profileInfo.languages ? this.profileInfo.languages.length : 0;
        this.saveLanguage(res, len);
      }
    });
  }

  updateLanguage(row: Language, i: any): void {
    this.dialog.open(LanguagesPopupComponent, {
      data: {
        isEdit: true,
        language: row
      }
    }).afterClosed().subscribe((res: Language) => {
      if (res) {
        console.log(res);
        this.saveLanguage(res, i);
      }
    });
  }

  saveLanguage(res, index): void {
    if (!this.profileInfo.languages) {
      this.profileInfo.languages = [];
    }

    this.profileInfo.languages[index] = res;
    this.refereshLanguageTable();
    this.saveProfile();
  }

  deleteLanguage(_row: Language, i: any): void {
    this.profileInfo.languages.splice(i, 1);
    this.saveProfile();
    this.refereshLanguageTable();
  }

  refereshLanguageTable() {
    const data = JSON.stringify(this.profileInfo.languages);
    this.profileInfo.languages = JSON.parse(data);
  }

  /* Language */


  /* Other Roles */

  addOtherRoles(): void {
    const row = new OtherRoles();
    this.dialog.open(OtherRolesPopupComponent, {
      data: {
        isEdit: false,
        data: row
      }
    }).afterClosed().subscribe((res: OtherRoles) => {
      if (res) {
        const len = this.profileInfo.secroles ? this.profileInfo.secroles.length : 0;
        this.saveOtherRoles(res, len);
      }
    });
  }

  updateOtherRoles(row: OtherRoles, i: any): void {
    this.dialog.open(OtherRolesPopupComponent, {
      data: {
        isEdit: true,
        data: row
      }
    }).afterClosed().subscribe((res: OtherRoles) => {
      if (res) {
        console.log(res);
        this.saveOtherRoles(res, i);
      }
    });
  }

  saveOtherRoles(res, index): void {
    if (!this.profileInfo.secroles) {
      this.profileInfo.secroles = [];
    }

    this.profileInfo.secroles[index] = res;
    this.refereshOtherRolesTable();
    this.saveProfile();
  }

  deleteOtherRole(_row: OtherRoles, i: any): void {
    this.profileInfo.secroles.splice(i, 1);
    this.saveProfile();
    this.refereshOtherRolesTable();
  }

  refereshOtherRolesTable() {
    const data = JSON.stringify(this.profileInfo.secroles);
    this.profileInfo.secroles = JSON.parse(data);
  }

  /* Language */


  /* Prefered working locations */

  addOtherLocation(): void {
    this.dialog.open(LocationPopupComponent, {
      data: {
        isEdit: false,
        location: null
      }
    }).afterClosed().subscribe((res: Location) => {
      if (res) {
        const len = this.profileInfo.otherLocations ? this.profileInfo.otherLocations.length : 0;
        this.saveLocation(res, len);
      }
    });
  }

  updateLocation(row: Location, i: any): void {
    this.dialog.open(LocationPopupComponent, {
      data: {
        isEdit: true,
        location: row
      }
    }).afterClosed().subscribe((res: Location) => {
      if (res) {
        console.log(res);
        this.saveLocation(res, i);
      }
    });
  }

  saveLocation(res, index): void {
    if (!this.profileInfo.otherLocations) {
      this.profileInfo.otherLocations = [];
    }

    this.profileInfo.otherLocations[index] = res;
    this.refereshLocationsTable();
    this.saveProfile();
  }

  deleteLocations(_row: Language, i: any): void {
    this.profileInfo.otherLocations.splice(i, 1);
    this.saveProfile();
    this.refereshLocationsTable();
  }

  refereshLocationsTable() {
    const data = JSON.stringify(this.profileInfo.otherLocations);
    this.profileInfo.otherLocations = JSON.parse(data);
  }

  /* Language */

  /* Experience */
  addExperience(): void {
    const row = new Experience();
    this.dialog.open(ExpInfoComponent, {
      data: {
        isEdit: false,
        experienceInfo: row
      }
    }).afterClosed().subscribe((res: Experience) => {
      if (res) {
        this.saveExperience(res, 'add');
      }
    });
  }

  updateExperience(row: Experience): void {
    this.dialog.open(ExpInfoComponent, {
      data: {
        isEdit: true,
        experienceInfo: row
      }
    }).afterClosed().subscribe((res: Experience) => {
      if (res) {
        console.log(res);
        this.saveExperience(res, 'update');
      }
    });
  }

  saveExperience(res, action): void {
    if (!this.profileInfo.experience) {
      this.profileInfo.experience = [];
    }
    if (action === 'add') {
      this.profileInfo.experience.push(res);
    } else if (action === 'update') {
      const index = this.profileInfo.experience.findIndex((exp: Experience) => exp.id === res.id);
      this.profileInfo.experience[index] = res;
    }
    this.refereshExpTable();
    this.saveProfile();
  }

  deleteExperience(_row: Experience, i: any): void {
    this.profileInfo.experience.splice(i, 1);
    this.saveProfile();
    this.refereshExpTable();
  }

  refereshExpTable() {
    const teamDetails = JSON.stringify(this.profileInfo.experience);
    this.profileInfo.experience = JSON.parse(teamDetails);
  }

  /* Experience */

  /* Awards */
  addAwards(): void {
    const row = new Awards();
    this.dialog.open(AwardsPopupComponent, {
      data: {
        isEdit: false,
        awards: row
      }
    }).afterClosed().subscribe((res: Awards) => {
      if (res) {
        const len = this.profileInfo.awards ? this.profileInfo.awards.length : 0;
        this.saveAwards(res, len);
      }
    });
  }

  updateAwards(row: Awards, i: any): void {
    console.log('Awards', i);
    this.dialog.open(AwardsPopupComponent, {
      data: {
        isEdit: true,
        awards: row
      }
    }).afterClosed().subscribe((res: Awards) => {
      if (res) {
        console.log('Awards', res, i);
        this.saveAwards(res, i);

      }
    });
  }

  saveAwards(res, index): void {
    if (!this.profileInfo.awards) {
      this.profileInfo.awards = [];
    }

    this.profileInfo.awards[index] = res;
    this.refereshAwardsTable();
    this.saveProfile();
  }

  deleteAwards(_row: Experience, i: any): void {
    this.profileInfo.awards.splice(i, 1);
    this.saveProfile();
    this.refereshAwardsTable();
  }

  refereshAwardsTable() {
    const data = JSON.stringify(this.profileInfo.awards);
    this.profileInfo.awards = JSON.parse(data);
  }

  /* Awards */

  /* Network */

  addNetwork(): void {
    const row = new Network();
    this.dialog.open(NetworkInfoComponent, {
      data: {
        isEdit: false,
        networkInfo: row
      }
    }).afterClosed().subscribe((res: Network) => {
      if (res) {
        this.saveNetwork(res, 'add');
      }
    });
  }

  saveNetwork(res, action) {
    if (!this.profileInfo.network) {
      this.profileInfo.network = [];
    }
    if (action === 'add') {
      this.profileInfo.network.push(res);
    } else if (action === 'update') {
      const index = this.profileInfo.network.findIndex((data: Network) => data.id === res.id);
      this.profileInfo.network[index] = res;
    }
    this.refereshNetworkTable();
    this.saveProfile();
  }

  updateNetwork(row: Network): void {
    this.dialog.open(NetworkInfoComponent, {
      data: {
        isEdit: true,
        networkInfo: row
      }
    }).afterClosed().subscribe((res: Network) => {
      if (res) {
        console.log(res);
        this.saveNetwork(res, 'update');

      }
    });
  }

  deleteNetwork(_row: Network, i: any): void {
    this.profileInfo.network.splice(i, 1);
    this.saveProfile();
    this.refereshNetworkTable();
  }

  refereshNetworkTable() {
    const data = JSON.stringify(this.profileInfo.network);
    this.profileInfo.network = JSON.parse(data);
  }

  /*  Network */

  /* References */

  addReference(): void {
    const row = new Reference();
    this.dialog.open(ReferencePopupComponent, {
      data: {
        isEdit: false,
        reference: row
      }
    }).afterClosed().subscribe((res: Reference) => {
      if (res) {
        const len = this.profileInfo.reference ? this.profileInfo.reference.length : 0;
        this.saveReference(res, len);
      }
    });
  }

  updateReference(row: Reference, i: any): void {
    this.dialog.open(ReferencePopupComponent, {
      data: {
        isEdit: true,
        reference: row
      }
    }).afterClosed().subscribe((res: Reference) => {
      if (res) {
        console.log(res);
        this.saveReference(res, i);

      }
    });
  }

  saveReference(res, index): void {
    if (!this.profileInfo.reference) {
      this.profileInfo.reference = [];
    }

    this.profileInfo.reference[index] = res;
    this.refereshReferenceTable();
    this.saveProfile();
  }

  deleteReference(_row: Reference, i: any): void {
    this.profileInfo.reference.splice(i, 1);
    this.saveProfile();
    this.refereshReferenceTable();
  }

  refereshReferenceTable() {
    const data = JSON.stringify(this.profileInfo.reference);
    this.profileInfo.reference = JSON.parse(data);
  }

  /* References */


  editPersonalInfo(): void {
    let personalInfo = {};
    personalInfo['brandname'] = this.profileInfo.brandname || null;
    personalInfo['brandurl'] = this.profileInfo.brandurl || null;
    personalInfo['name'] = this.profileInfo.name;
    personalInfo['address'] = this.profileInfo.address || null;
    personalInfo['city'] = this.profileInfo.city || null;
    personalInfo['country'] = this.profileInfo.country || null;
    personalInfo['description'] = this.profileInfo.description || null;
    personalInfo['rate'] = this.profileInfo.rate || null;
    personalInfo['mobile'] = this.profileInfo.mobile || null;
    personalInfo['role'] = this.profileInfo.role || null;
    personalInfo['otherroles'] = this.profileInfo.otherroles || null;
    personalInfo['email'] = this.profileInfo.email;
    personalInfo['currencytype'] = this.currencyType;

    personalInfo = JSON.parse(JSON.stringify(personalInfo));

    this.dialog.open(PersonalInfoComponent, {
      data: {
        isEdit: true,
        data: personalInfo
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.savePersonalInfo(res);
      }
    });
  }

  editPayment(): void {
    let info = this.profileInfo.payment ? JSON.parse(JSON.stringify(this.profileInfo.payment)) : null;
    this.dialog.open(PaymentPopupComponent, {
      data: {
        isEdit: true,
        payment: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.savePayment(res);
      }
    });
  }

  editIndustries(): void {
    let info = JSON.parse(JSON.stringify(this.profileInfo.industries || []));
    this.dialog.open(IndustriesComponent, {
      data: {
        data: info
      },
      panelClass: 'dialog-wide'
    })
      .afterClosed().subscribe((res: any) => {
        if (res) {
          console.log('industry', res);
          this.saveIndustries(res);
        }
      });
  }

  editTools(): void {
    let info = JSON.parse(JSON.stringify(this.profileInfo.tools || []));
    this.dialog.open(ToolsComponent, {
      data: {
        data: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveTools(res);
      }
    });
  }

  editCategories(): void {
    let info = JSON.parse(JSON.stringify(this.profileInfo.categories || []));
    this.dialog.open(CategoriesComponent, {
      data: {
        isEdit: true,
        data: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveCategories(res);
      }
    });
  }

  editGenres(): void {
    let info = JSON.parse(JSON.stringify(this.profileInfo.genres || []));
    this.dialog.open(GenresComponent, {
      data: {
        isEdit: true,
        data: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveGenres(res);
      }
    });
  }

  editEducation(): void {
    let info = this.profileInfo.education ? JSON.parse(JSON.stringify(this.profileInfo.education)) : null;
    this.dialog.open(EducationComponent, {
      data: {
        isEdit: true,
        data: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveEducation(res);
      }
    });
  }

  editAvatar(): void {
    let info = this.profileInfo.avatar ? JSON.parse(JSON.stringify(this.profileInfo.avatar)) : null;
    let info1 = this.profileInfo.avatarFull ? JSON.parse(JSON.stringify(this.profileInfo.avatarFull)) : null;
    this.dialog.open(AvatarPopupComponent, {
      data: {
        isEdit: true,
        image: info,
        fullImage: info1
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveAvatar(res);
        // this.refereshAvatar();
      }
    });
  }


  editLinks(): void {
    let info = JSON.parse(JSON.stringify(this.profileInfo.links || {}));
    this.dialog.open(socialLinksComponent, {
      data: {
        data: info
      },
      panelClass: 'dialog-wide'
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.saveLinks(res);
      }
    });
  }

  // refereshAvatar() {
  //   let data = JSON.stringify(this.profileInfo.avatar);
  //   this.profileInfo.avatar = JSON.parse(data);
  // }


  savePersonalInfo(data): void {
    this.profileInfo.brandname = data.brandname || null;
    this.profileInfo.brandurl = data.brandurl || null;
    this.profileInfo.name = data.name;
    this.profileInfo.address = data.address || null;
    this.profileInfo.city = data.city || null;
    this.profileInfo.country = data.country || null;
    this.profileInfo.description = data.description || null;
    this.profileInfo.rate = data.rate || null;
    this.profileInfo.mobile = data.mobile || null;
    this.profileInfo.role = data.role || null;
    this.profileInfo.otherroles = data.otherroles || null;
    this.saveProfile();
  }

  saveIndustries(data): void {
    this.profileInfo.industries = data;
    this.saveProfile();
  }

  savePayment(data) {
    this.profileInfo.payment = data;
    this.saveProfile();
  }

  saveTools(data): void {
    this.profileInfo.tools = data;
    this.saveProfile();
  }

  saveCategories(data): void {
    this.profileInfo.categories = data;
    this.saveProfile();
  }

  saveGenres(data): void {
    this.profileInfo.genres = data;
    this.saveProfile();
  }

  saveLinks(data): void {
    this.profileInfo.links = data;
    this.saveProfile();
  }

  saveEducation(data): void {
    this.profileInfo.education = data;
    this.saveProfile();
  }

  saveAvatar(data): void {
    this.profileInfo.avatar = data[1];
    const item = this.profileInfo.avatar.toString();
    this.profileInfo.avatar = item + '?' + new Date().getTime();
    this.sharedService.setProfileImage(this.profileInfo.avatar);

    if (data[0]) {
      this.profileInfo.avatarFull = data[0];
      const item1 = this.profileInfo.avatarFull.toString();
      this.profileInfo.avatarFull = item1 + '?' + new Date().getTime();
    }

    this.saveProfile();
  }

  saveProfile(): void {
    this.isLoading = true;
    this.profileInfo.identityid = this.creatorId;
    console.log('this.profileInfo.id', this.profileInfo.identityid);
    this.api.postProfile(this.profileInfo).then((res: Profile) => {
      console.log('res', res);
      // this.calculatePercentage(res);
      this.api.saveProfileInfoObservable(res);
      this.profileInfo = res;
      this.isLoading = false;
    }, (err => {
      this.isLoading = false;
      console.log('err', err);
    }));
  }


}
