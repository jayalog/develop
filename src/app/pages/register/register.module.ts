import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material-components.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { PageModule } from '../../core/common/page/page.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingOverlayModule,
    PageModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {
}
