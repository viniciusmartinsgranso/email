import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton, AlertController, ModalController, ToastController } from '@ionic/angular';
import { UpdateUserPayload } from '../models/payloads/update-user.payload';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  constructor(
    private readonly toast: ToastController,
    private readonly alert: AlertController,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly modalController: ModalController,
  ) { }

  public async createToast(message: string, position: 'top' | 'bottom' | 'middle', duration?: number): Promise<void> {
    const toast = await this.toast.create({
      message: message,
      duration: duration ? duration : 1000,
      position: position,
      mode: 'md',
      cssClass: ['toast-content', 'toast-wrapper']
    });
    await toast.present();
  }

  public async createAlert(header: string, message: string, buttons: (AlertButton | string)[]): Promise<void> {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: buttons,
      mode: 'md',
      cssClass: ['alert-wrapper', 'alert-title', 'alert-1-msg', 'alert-button']
    });
    await alert.present();
  }

  public async deleteUser(header: string, message: string, user: UpdateUserPayload): Promise<void> {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Deseja realmente excluir sua conta?',
          handler: async () => {
            await this.userService.delete(user.id)
            await this.modalController.dismiss();
            await this.router.navigateByUrl('/login#login');

            setTimeout(async () => {
              await this.createToast('Usuário deletado com sucesso', 'bottom', 2000);
            }, 500);
          }
        },
        {
          text: 'Não! Cliquei sem querer hehe'
        }
      ],
    });

    await alert.present();
  }
}
