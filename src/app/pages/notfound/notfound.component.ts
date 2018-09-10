import { Component, OnInit } from '@angular/core';

import { fadeOutAnimation } from '../../core/common/route.animation';
@Component({
  selector: 'fury-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' }
})
export class NotfoundComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}
