import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { PersonalInfoFields } from '../shared/percentageCompletion';
import { Profile } from '../shared/profile.interface';

@Component({
  selector: 'fury-profile-calculation',
  templateUrl: './profile.calculation.component.html',
  styleUrls: ['./profile.calculation.scss'],
})
export class ProfileCalculationComponent {
  totalPercentageCompleted: number;
  languageInfoPercentage: number;
  industryInfoPercentage: number;
  genresInfoPercentage: number;
  toolsInfoPercentage: number;
  categoriesInfoPercentage: number;
  educationInfoPercentage: number;
  networkInfoPercentage: number;
  referenceInfoPercentage: number;
  awardInfoPercentage: number;
  experienceInfoPercentage: number;
  personalInfoPercentage: number;
  paymentInfoPercentage: number;

  rolesPercentage: number;
  linksPercentage: number;
  locationsPercentage: number;


  personalInfoFields: PersonalInfoFields = new PersonalInfoFields();
  tooltip: string;

  @Output() percentageChange = new EventEmitter();

  constructor(private info: ApiService) {
    this.info.profileInfo.subscribe((response: Profile) => {
      this.calculatePercentage(response);
    });
  }

  populateFieldInfo(res: any, fieldInformation) {
    let key;
    if (res instanceof Array) {
      key = (res && res.length > 0) ? res[0] : [];
    } else {
      key = res;
    }
    for (const props in key) {
      if (fieldInformation.hasOwnProperty(props)) {
        fieldInformation[props] = key[props];
      }
    }
    return fieldInformation;
  }

  calculatePersonalField() {
    const total = Object.keys(this.personalInfoFields).length;
    const filledFields = this.filledFields(this.personalInfoFields);
    console.log(total, filledFields);
    return Math.round((filledFields / total) * 100);
  }

  filledFields(fields) {
    let filledCount = 0;
    for (const prop in fields) {
      if (fields[prop]) {
        filledCount++;
      }
    }
    return filledCount;
  }

  calculateLinks(res): number {
    let count = 0;
    let per = 0;
    Object.keys(res).map(function (key) {
      if (res[key] !== null) {
        count++;
      }
    });
    count >= 1 ? per = 5 : per = 0;
    return per;
  }

  calculatePercentage(res: Profile): void {
    this.populateFieldInfo(res, this.personalInfoFields);
    this.personalInfoPercentage = Math.round(this.calculatePersonalField() * 45 / 100);
    // this.experienceInfoPercentage = res.experience ? (Math.round((res.experience.length > 0) ? 100 : 0) * 5 / 100) : 0;
    this.awardInfoPercentage = res.awards ? (((res.awards.length > 0) ? 100 : 0) * 5 / 100) : 0;
    this.networkInfoPercentage = res.network ? (((res.network.length > 0) ? 100 : 0) * 10 / 100) : 0;
    // this.referenceInfoPercentage = res.reference ? (((res.reference.length > 0) ? 100 : 0) * 5 / 100) : 0;
    this.languageInfoPercentage = res.languages ? (((res.languages.length > 0) ? 100 : 0) * 5 / 100) : 0;
    this.industryInfoPercentage = res.industries ? (((res.industries.length > 0) ? 100 : 0) * 5 / 100) : 0;
    // this.genresInfoPercentage = res.genres ? (((res.genres.length > 0) ? 100 : 0) * 3 / 100) : 0;
    // this.toolsInfoPercentage = res.tools ? (((res.tools.length > 0) ? 100 : 0) * 3 / 100) : 0;
    this.categoriesInfoPercentage = res.categories ? (((res.categories.length > 0) ? 100 : 0) * 5 / 100) : 0;
    // this.educationInfoPercentage = res.education ? (((res.education) ? 100 : 0) * 3 / 100) : 0;
    this.paymentInfoPercentage = res.payment ? 10 : 0;

    this.rolesPercentage = res.secroles ? (res.secroles.length > 0 ? 5 : 0) : 0;
    this.locationsPercentage = res.otherLocations ? (res.otherLocations.length > 0 ? 5 : 0) : 0;
    this.linksPercentage = res.links ? this.calculateLinks(res.links) : 0;

    this.totalPercentageCompleted = (
      this.personalInfoPercentage +
      // this.experienceInfoPercentage +
      this.awardInfoPercentage +
      this.networkInfoPercentage +
      // this.referenceInfoPercentage +
      this.languageInfoPercentage +
      this.industryInfoPercentage +
      // this.genresInfoPercentage +
      // this.toolsInfoPercentage +
      this.categoriesInfoPercentage +
      this.paymentInfoPercentage +
      this.rolesPercentage +
      this.locationsPercentage +
      this.linksPercentage
      // this.educationInfoPercentage
    );
    console.log(this.totalPercentageCompleted, '%');
    this.percentageChange.emit(this.totalPercentageCompleted);
    this.tooltip = this.totalPercentageCompleted + "% Complete";
  }
}
