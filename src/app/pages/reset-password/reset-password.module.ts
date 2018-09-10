import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material-components.module';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { PageModule } from '../../core/common/page/page.module';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
    PageModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule {
}
