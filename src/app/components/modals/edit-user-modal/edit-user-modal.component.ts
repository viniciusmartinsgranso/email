import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateUserPayload } from '../../../models/payloads/update-user.payload';
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
    private readonly modalController: ModalController,
  ) {
    console.log(this.user);
  }

  public autocompleteEmail: boolean = false;

  public confirmEmailRegister: boolean = false;

  public user: UpdateUserPayload = {
    id: 0,
    name: 'Vini',
    email: 'vini@email.com',
    age: 0,
    photoUrl: 'assets/images/user.jpg',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit() {}

  public async closeModal(): Promise<void> {
    return void await this.modalController.dismiss();
  }

  public verifyAt(email: any): void {
    email.includes('@') ? this.autocompleteEmail = true : this.autocompleteEmail = false;
    this.user.email = email;
    console.log(this.user.email);
  }

  public fillEmail(element: any): void {
    this.user.email = element.value;
    console.log(this.user.email);
  }

}
