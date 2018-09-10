import { Component } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../common/list.animation';
import { MatDialog } from '@angular/material';

import { ContactComponent } from '../../contact/contact.component';

@Component({
  selector: 'fury-toolbar-help',
  templateUrl: './toolbar-help.component.html',
  styleUrls: ['./toolbar-help.component.scss'],
  animations: [...LIST_FADE_ANIMATION]
})
export class ToolbarHelpComponent {
  isOpen: boolean;
  constructor(private dialog: MatDialog) {
  }

  onClickOutside() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  openContact(): void {
    this.dialog.open(ContactComponent, {
      panelClass: 'dialog-wide',
      // backdropClass: 'dialog-backdrop-contact',
      autoFocus: false
    });
  }
}
