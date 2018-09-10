import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'fury-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('quickpanel') quickpanel: MatSidenav;
  sharedService: any;

  constructor(sharedService: SharedDataService) {
    this.sharedService = sharedService;
  }

  ngOnInit() { }


}
