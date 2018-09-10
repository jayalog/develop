import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AspectRatioModule } from '../../core/common/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../core/common/material-components.module';
import { PageModule } from '../../core/common/page/page.module';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { ProjectDetailsGridComponent } from './project-details-grid/project-details-grid.component';
import { AddProjectModalComponent, AddProjectModal } from './add-project-modal/add-project-modal.component';
import { AddTeamComponent, AddTeamModal } from './add-team/add-team.component';
import { MoreInfoComponent, MoreInfoModal } from './more-info-component/more-info-component.component';
import { LoadingOverlayModule } from '../../core/common/loading-overlay/loading-overlay.module';
import { DeleteConfirmationComponent, DeleteConfirmationPopup } from './delete-confirmation/delete-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PortfolioRoutingModule,
    // Core
    AspectRatioModule,
    PageModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingOverlayModule
  ],
  declarations: [PortfolioComponent, ProjectDetailsGridComponent, AddProjectModalComponent, AddTeamComponent, MoreInfoComponent, DeleteConfirmationComponent],
  providers: [AddProjectModal, AddTeamModal, MoreInfoModal, DeleteConfirmationPopup],
  entryComponents: [AddProjectModalComponent, AddTeamComponent, MoreInfoComponent, DeleteConfirmationComponent]
})
export class PortfolioModule {
}
