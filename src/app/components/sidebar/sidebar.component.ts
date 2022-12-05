import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarEnum, sidebarTranslated } from '../../models/enums/sidebar.enum';
import { SidebarInterface } from '../../models/interfaces/sidebar.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) {
    // router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((route: NavigationEndroute) => {
    //     if (route.url.includes('/inbox'))
    //       this.currentSidebar = SidebarEnum.INBOX;
    //
    //     if (route.url.includes('/outbox'))
    //       this.currentSidebar = SidebarEnum.OUTBOX;
    //
    //     if (route.url.includes('/favorites'))
    //       this.currentSidebar = SidebarEnum.FAVORITES;
    //
    //     if (route.url.includes('/archived'))
    //       this.currentSidebar = SidebarEnum.ARCHIVED;
    //
    //     if (route.url.includes('/spam'))
    //       this.currentSidebar = SidebarEnum.SPAM;
    //
    //     if (route.url.includes('/trash'))
    //       this.currentSidebar = SidebarEnum.TRASH;
    //   });
  }

  public currentSidebar: SidebarEnum = SidebarEnum.ARCHIVED;

  public sidebarList: SidebarInterface[] = [
    {
      type: SidebarEnum.INBOX,
      link: '/inbox',
      icon: 'assets/images/inbox.svg',
      iconActivated: 'assets/images/inbox-selected.svg'
    },
    {
      type: SidebarEnum.OUTBOX,
      link: '/outbox',
      icon: 'assets/images/outbox.svg',
      iconActivated: 'assets/images/outbox-selected.svg'
    },
    {
      type: SidebarEnum.FAVORITES,
      link: '/favorites',
      icon: 'assets/images/favorite.svg',
      iconActivated: 'assets/images/favorite-selected.svg'
    },
    {
      type: SidebarEnum.SPAM,
      link: '/spam',
      icon: 'assets/images/spam.svg',
      iconActivated: 'assets/images/spam-selected.svg'
    },
    {
      type: SidebarEnum.TRASH,
      link: '/trash',
      icon: 'assets/images/trash.svg',
      iconActivated: 'assets/images/trash-selected.svg'
    }
  ];

  public translated: Record<SidebarEnum, string> = sidebarTranslated;

  ngOnInit() {}

}
