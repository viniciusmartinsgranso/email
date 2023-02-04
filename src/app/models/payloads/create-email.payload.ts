import { UserProxy } from '../proxies/user.proxy';

export interface CreateEmailPayload {
  id: number;
  title: string;
  description: string;
  userWriter: UserProxy;
  userReceiver: UserProxy;
  photoUrl?: string;
}
