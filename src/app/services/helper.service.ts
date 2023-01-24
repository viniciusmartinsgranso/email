import { Injectable } from '@angular/core';
import { AlertButton, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class HelperService {

  constructor(
    private readonly toast: ToastController,
    private readonly alert: AlertController,
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
}
