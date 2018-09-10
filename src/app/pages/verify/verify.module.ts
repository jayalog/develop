import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material-components.module';
import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { PageModule } from '../../core/common/page/page.module';

@NgModule({
  imports: [
    CommonModule,
    VerifyRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
    PageModule
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule {
}
