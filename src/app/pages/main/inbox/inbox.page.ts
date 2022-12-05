import { Component, OnInit } from '@angular/core';
import { usersMock } from '../../../models/mocks/users.mock';
import { EmailProxy } from '../../../models/proxies/email.proxy';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  constructor() { }

  public emailList: EmailProxy[] = [
    {
      id: 0,
      title: 'aaa',
      userWriter: usersMock[0],
      userReceiver: usersMock[0],
      isImportant: true,
      description: 'DSIJOPHFWYIEUHFWEIUFHWEUHFWHJE'
    }
  ];

  ngOnInit() {
  }

}
