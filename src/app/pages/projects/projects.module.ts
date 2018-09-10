import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AspectRatioModule } from '../../core/common/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProjectsRoutingModule,
    // Core
    AspectRatioModule,
    PageModule,

  ],
  declarations: [ProjectsComponent],
  providers: []
})
export class ProjectsModule {
}
