import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserProxy } from '../../models/proxies/user.proxy';
import { UserService } from '../../services/user.service';
import { EditUserModalComponent } from '../modals/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly modalController: ModalController,
    private readonly router: Router,
  ) { }

  public user: UserProxy = {
    id: 0,
    name: '',
    email: 'vini@email.com',
    age: 20,
    photoUrl: 'assets/images/user.jpg',
    emailsPosted: [],
    emailsReceived: [],
    phone: ''
  };

  public toggle: boolean = false;

  public async ngOnInit(): Promise<void> {
    this.user = await this.userService.get();
  }

  public async editProfileModal(): Promise<void> {
    const modal = await this.modalController.create({
      mode: 'md',
      component: EditUserModalComponent,
      cssClass: 'background-blur',
    });
    await modal.present();
  }

  public async logoutUser(): Promise<void> {
    this.userService.logoutUser();
    return void await this.router.navigateByUrl('/login#login');
  }

}
