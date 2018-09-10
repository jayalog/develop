import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { AspectRatioModule } from '../../core/common/aspect-ratio/aspect-ratio.module';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ExpInfoComponent } from './expInfoPopup/expInfoPopup.component';
import { AwardsPopupComponent } from './awardsPopup/awardsPopup.component';
import { ReferencePopupComponent } from './referencesPopup/referencesPopup.component';
import { LanguagesPopupComponent } from './languagesPopup/languagesPopup.component';
import { AvatarPopupComponent } from './avatarPopup/avatarPopup.component';
import { PersonalInfoComponent } from './personalInfoPopup/personalInfoPopup.component';
import { IndustriesComponent } from './industriesPopup/industries.component';
import { PaymentPopupComponent } from './paymentPopup/paymentPopup.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { CategoriesComponent } from './categoriesPopup/categories.component';
import { ToolsComponent } from './toolsPopup/tools.component';
import { GenresComponent } from './genresPopup/genres.component';
import { EducationComponent } from './educationPopup/education.component';
import { NetworkInfoComponent } from './networkPopup/networkPopup.component';
import { LocationPopupComponent } from './locationsPopup/locationsPopup.component';
import { socialLinksComponent } from './socialLinksPopup/socialLinks.component';
import { OtherRolesPopupComponent } from './otherrolesPopup/otherrolesPopup.component';

import { ProfileCalculationComponent } from './profileCalculation/profile.calculation';
import { RangeSlider } from './shared/slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProfileRoutingModule,
    // Core
    AspectRatioModule,
    PageModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingOverlayModule,
    ImageCropperModule
  ], // tslint:disable-next-line:max-line-length
  declarations: [ProfileComponent, OtherRolesPopupComponent, socialLinksComponent, LocationPopupComponent, ExpInfoComponent, AwardsPopupComponent, ReferencePopupComponent, PersonalInfoComponent, IndustriesComponent, CategoriesComponent, ToolsComponent, GenresComponent, EducationComponent, NetworkInfoComponent, LanguagesPopupComponent, AvatarPopupComponent, ProfileCalculationComponent, RangeSlider, PaymentPopupComponent], // tslint:disable-next-line:max-line-length
  entryComponents: [ExpInfoComponent, OtherRolesPopupComponent, socialLinksComponent, LocationPopupComponent, PersonalInfoComponent, AwardsPopupComponent, ReferencePopupComponent, IndustriesComponent, CategoriesComponent, ToolsComponent, GenresComponent, EducationComponent, NetworkInfoComponent, LanguagesPopupComponent, AvatarPopupComponent, ProfileCalculationComponent, RangeSlider, PaymentPopupComponent],
  providers: []
})
export class ProfileModule {
}
