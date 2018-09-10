import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'fury-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
