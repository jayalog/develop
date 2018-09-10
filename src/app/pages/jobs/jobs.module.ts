import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AspectRatioModule } from '../../core/common/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';
import { JobsComponent } from './jobs.component';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    JobsRoutingModule,
    // Core
    AspectRatioModule,
    PageModule,

  ],
  declarations: [JobsComponent],
  providers: []
})
export class JobsModule {
}
