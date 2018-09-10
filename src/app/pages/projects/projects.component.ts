import { Component, OnInit } from '@angular/core';
import Amplify, { API } from 'aws-amplify';

import { fadeOutAnimation } from '../../core/common/route.animation';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'fury-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [fadeOutAnimation],
  host: { '[@fadeOutAnimation]': 'true' },
  providers: [ApiService]
})
export class ProjectsComponent implements OnInit {

  constructor(private api: ApiService) {}

  ngOnInit() {}

}
