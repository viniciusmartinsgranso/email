import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UpdateUserPayload } from '../../../models/payloads/update-user.payload';
import { HelperService } from '../../../services/helper.service';
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
    private readonly helperService: HelperService,
    private readonly router: Router,
  ) {
    this.getUser().then();
  }

  public autocompleteEmail: boolean = false;

  public confirmEmailRegister: boolean = false;

  public user: UpdateUserPayload = {
    id: 0,
    name: '',
    email: '',
    age: 0,
    photoUrl: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
  public showPasswordRegister: boolean = false;

  public showPasswordRegisterConfirm: boolean = false;

  ngOnInit() {}

  public async closeModal(): Promise<void> {
    return void await this.modalController.dismiss();
  }

  public async getUser(): Promise<void> {
    const user = localStorage.getItem('loggedUser');
    this.user = user ? JSON.parse(user) : false;
    this.user.email = this.user.email?.replace("@vinimail.com", "");
  }

  public verifyAt(email: any): void {
    email.includes('@') ? this.autocompleteEmail = true : this.autocompleteEmail = false;
    this.user.email = email;
    console.log(this.user.email);
  }

  public phoneMask(phone: string): void {
    const deveTerTracinho = phone.length >= 9;
    this.user.phone = phone.replace(/\D/g, '')
      .replace(/^([1-9]{1,2})([1-9]{0,5})([1-9]{0,4})/, deveTerTracinho ? '($1)$2-$3' : '($1)$2');
  }

  public fillEmail(element: any): void {
    this.user.email = element.value;
    console.log(this.user.email);
  }

  public async updateUser(user: UpdateUserPayload): Promise<void> {
    this.userService.update(user);
    await this.helperService.createAlert({
      header: 'Perfil atualizado com sucesso!',
      message: 'Parabéns!\\nSeu perfil foi atualizado com sucesso!',
      buttons: ['Entendido!'],
    });
    // await this.helperService.createAlert('Perfil atualizado com sucesso!', 'Parabéns!\nSeu perfil foi atualizado com sucesso!', ['Entendido!']);
    await this.modalController.dismiss();
    location.reload();
  }

  public async deleteUser(user: UpdateUserPayload): Promise<void> {
    await this.userService.deleteUser({
      message: 'Iremos excluir sua conta, tem certeza disso?',
      header: 'Atenção!',
    }, user);
  }

  public deleteStorage(): void {
    localStorage.clear();
  }

}
