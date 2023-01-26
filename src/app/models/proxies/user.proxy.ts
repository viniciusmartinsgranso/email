import { EmailProxy } from './email.proxy';

export interface UserProxy {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  emailsPosted: EmailProxy[];
  emailsReceived: EmailProxy[];
  photoUrl: string;
}
