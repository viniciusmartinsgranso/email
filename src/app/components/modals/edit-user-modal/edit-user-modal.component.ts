import { Component, OnInit } from '@angular/core';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {

  constructor(
    private readonly userService: UserService,
  ) {
    this.getUser().then();
  }

  public user: UserProxy = {
    id: 0,
    name: 'Vini',
    email: 'vini@email.com',
    age: 20,
    photoUrl: 'assets/images/user.jpg',
    emailsPosted: [],
    emailsReceived: [],
    phone: 1
  };

  ngOnInit() {}

  public async getUser(): Promise<void> {
    this.user = await this.userService.get();
    console.log(this.user);
  }

}
