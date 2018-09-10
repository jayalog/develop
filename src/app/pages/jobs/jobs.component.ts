import { Component, OnInit } from '@angular/core';
import Amplify, { API } from 'aws-amplify';

import { fadeOutAnimation } from '../../core/common/route.animation';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'fury-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' },
  providers: [ApiService]
})
export class JobsComponent implements OnInit {

  constructor(private api: ApiService) {}

  ngOnInit() {}

}
