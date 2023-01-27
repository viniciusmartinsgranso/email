import { AlertButton } from '@ionic/angular';

export interface AlertOptionsInterface {
  header: string;
  message: string;
  buttons?: (AlertButton | string)[];
  cssClass?: string[];
}
