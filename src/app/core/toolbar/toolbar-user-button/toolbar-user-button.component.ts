import { Component, OnInit, Input } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../services/localstorage.service';

@Component({
  selector: 'fury-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  user: string;
  @Input() imageUrl: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = LocalStorage.getObject('userProfile')['given_name'];
  }

  signout(): void {
    Auth.signOut()
      .then(data => {
        this.clearUserData();
        this.router.navigate(['/login']);
        console.log(data);
      }).catch(err => console.log(err));
  }


  clearUserData() {
    LocalStorage.remove('userProfile');
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
