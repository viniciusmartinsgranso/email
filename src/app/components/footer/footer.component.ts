import { Component, OnInit } from '@angular/core';
import { UserProxy } from '../../models/proxies/user.proxy';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor() { }

  public user: UserProxy = {
    id: 0,
    name: 'Vini',
    email: 'vini@email.com',
    age: 20,
    photoUrl: 'assets/images/user.jpg',
    emailsPosted: [],
    emailsReceived: []
  };

  ngOnInit() {}

}
