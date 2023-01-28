import { SidebarEnum } from '../enums/sidebar.enum';
import { UserProxy } from './user.proxy';

export interface EmailProxy {
  id: number;
  userWriter: UserProxy;
  userReceiver: UserProxy
  title: string;
  description: string;
  isImportant: boolean;
  photoUrl?: string;
  copy?: UserProxy[];
  category?: SidebarEnum;
}
