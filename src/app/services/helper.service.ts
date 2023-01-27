import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  AlertController, ModalController, ToastController } from '@ionic/angular';
import { AlertOptionsInterface } from '../models/interfaces/alert-options.interface';
import { ToastOptionsInterface } from '../models/interfaces/toast-options.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  constructor(
    private readonly toast: ToastController,
    private readonly alert: AlertController,
  ) { }

  public async createToast(options: ToastOptionsInterface): Promise<void> {
    const toast = await this.toast.create({
      message: options.message,
      duration: options.duration ? options.duration : 1000,
      position: options.position,
      mode: 'md',
      cssClass: ['toast-content', 'toast-wrapper']
    });
    await toast.present();
  }

  public async createAlert(options: AlertOptionsInterface): Promise<void> {
    const alert = await this.alert.create({
      header: options.header,
      message: options.message,
      buttons: options.buttons,
      mode: 'md',
      cssClass: ['alert-wrapper', 'alert-title', 'alert-1-msg', 'alert-button']
    });
    await alert.present();
  }

  // public async deleteUser(header: string, message: string, user: UpdateUserPayload): Promise<void> {
  //   const alert = await this.alert.create({
  //     header: header,
  //     message: message,
  //     cssClass: ['alert-wrapper', 'alert-title', 'alert-1-msg', 'alert-button'],
  //     buttons: [
  //       {
  //         text: 'Deseja realmente excluir sua conta?',
  //         handler: async () => {
  //           await this.userService.delete(user.id)
  //           await this.modalController.dismiss();
  //           await this.router.navigateByUrl('/login#login');
  //
  //           setTimeout(async () => {
  //             await this.createToast({
  //               message: 'Usuário deletado com sucesso',
  //               position: 'bottom',
  //               duration: 2000
  //             });
  //           }, 500);
  //         }
  //       },
  //       {
  //         text: 'Não! Cliquei sem querer hehe'
  //       }
  //     ],
  //   });
  //
  //   await alert.present();
  // }
}
