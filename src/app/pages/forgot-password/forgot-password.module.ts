import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material-components.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { PageModule } from '../../core/common/page/page.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
    PageModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {
}
