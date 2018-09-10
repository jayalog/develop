import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FuryCardModule } from '../common/card/card.module';
import { ClickOutsideModule } from '../common/click-outside/click-outside.module';
import { MaterialModule } from '../common/material-components.module';
import { ScrollbarModule } from '../common/scrollbar/scrollbar.module';
// import { ToolbarFullscreenToggleComponent } from './toolbar-fullscreen-toggle/toolbar-fullscreen-toggle.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { ToolbarHelpComponent } from './toolbar-help/toolbar-help.component';
// import { ToolbarSearchBarComponent } from './toolbar-search-bar/toolbar-search-bar.component';
// import { ToolbarSearchComponent } from './toolbar-search/toolbar-search.component';
import { ToolbarSidenavMobileToggleComponent } from './toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component';
import { ToolbarUserButtonComponent } from './toolbar-user-button/toolbar-user-button.component';
import { ToolbarComponent } from './toolbar.component';
// import { ContactModule } from '../contact/contact.module';
import { ContactComponent } from '../contact/contact.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FormsModule,
    ClickOutsideModule,
    FuryCardModule,
    // ContactModule
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserButtonComponent,
    ToolbarNotificationsComponent,
    ToolbarHelpComponent,
    ContactComponent,
    // ToolbarSearchBarComponent,
    // ToolbarQuickpanelToggleComponent,
    // ToolbarFullscreenToggleComponent,
    ToolbarSidenavMobileToggleComponent
  ],
  entryComponents: [ContactComponent],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
