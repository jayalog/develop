import { Component } from '@angular/core';
import browserUpdate from 'browser-update';

import { SidenavItem } from './core/sidenav/sidenav-item/sidenav-item.interface';
import { SidenavService } from './core/sidenav/sidenav.service';
import { SharedDataService } from './services/shared-data.service';


@Component({
  selector: 'fury-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  browserConfigOptions: Object;

  constructor(sidenavService: SidenavService, private shared: SharedDataService) {
    const menu: SidenavItem[] = [];

    menu.push({
      name: 'Profile',
      routeOrFunction: '/',
      icon: 'person',
      position: 5,
      pathMatchExact: true
    });

    menu.push({
      name: 'Portfolio',
      routeOrFunction: '/portfolio',
      icon: 'work',
      position: 10,

    });

    // menu.push({
    //   name: 'Jobs',
    //   routeOrFunction: '/jobs',
    //   icon: 'folder_open',
    //   position: 15
    // });

    // menu.push({
    //   name: 'Projects',
    //   routeOrFunction: '/projects',
    //   icon: 'folder',
    //   position: 20
    // });


    // Send all created Items to SidenavService
    menu.forEach(item => sidenavService.addItem(item));
    this.browserConfigOptions = {
      required: {
        e: -2,
        i: 11,
        f: -3,
        o: -3,
        s: 10.1,
        c: "64.0.3282.16817",
      },
      insecure: true
    };
  }

  ngOnInit() {
    console.log(window.navigator.userAgent);
    let ua = window.navigator.userAgent;
    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      let rv = ua.indexOf('rv:');
      let version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      if (version >= 10) {
        window.alert('For better support please use chorme or firefox.');
      }
    }

    let mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
    if (mac)
      this.shared.setOs('mac');
    else
      this.shared.setOs('windows');

    browserUpdate(this.browserConfigOptions);
  }
}
