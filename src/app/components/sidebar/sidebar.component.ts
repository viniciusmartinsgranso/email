import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
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
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((route) => {
        const routerEvent = route as NavigationEnd

        if (routerEvent.url.includes('/inbox'))
          this.currentSidebar = SidebarEnum.INBOX;

        if (routerEvent.url.includes('/outbox'))
          this.currentSidebar = SidebarEnum.OUTBOX;

        if (routerEvent.url.includes('/favorites'))
          this.currentSidebar = SidebarEnum.FAVORITES;

        if (routerEvent.url.includes('/archived'))
          this.currentSidebar = SidebarEnum.ARCHIVED;

        if (routerEvent.url.includes('/spam'))
          this.currentSidebar = SidebarEnum.SPAM;

        if (routerEvent.url.includes('/trash'))
          this.currentSidebar = SidebarEnum.TRASH;

        if (routerEvent.url.includes('/create'))
          this.currentSidebar = SidebarEnum.CREATE;
      });
  }

  public currentSidebar: SidebarEnum = SidebarEnum.ARCHIVED;

  public sidebarList: SidebarInterface[] = [
    {
      type: SidebarEnum.INBOX,
      link: '/inbox',
      icon: 'assets/images/inbox.svg',
      iconActivated: 'assets/images/inbox.svg'
    },
    {
      type: SidebarEnum.OUTBOX,
      link: '/outbox',
      icon: 'assets/images/outbox.svg',
      iconActivated: 'assets/images/outbox.svg'
    },
    {
      type: SidebarEnum.FAVORITES,
      link: '/favorites',
      icon: 'assets/images/favorite.svg',
      iconActivated: 'assets/images/favorite.svg'
    },
    {
      type: SidebarEnum.SPAM,
      link: '/spam',
      icon: 'assets/images/spam.svg',
      iconActivated: 'assets/images/spam.svg'
    },
    {
      type: SidebarEnum.TRASH,
      link: '/trash',
      icon: 'assets/images/trash.svg',
      iconActivated: 'assets/images/trash.svg'
    },
    {
      type: SidebarEnum.CREATE,
      link: '/create',
      icon: 'assets/images/create.svg',
      iconActivated: 'assets/images/create.svg'
    }
  ];

  public translated: Record<SidebarEnum, string> = sidebarTranslated;

  ngOnInit() {}

}
