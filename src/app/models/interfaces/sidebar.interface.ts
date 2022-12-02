import { SidebarEnum } from '../enums/sidebar.enum';

export interface SidebarInterface {
  type: SidebarEnum,
  link: string;
  icon: string;
  iconActivated: string;
}
