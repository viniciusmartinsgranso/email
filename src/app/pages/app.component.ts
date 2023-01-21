import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
  ) {
    this.routeSubscription = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe( (route) => {
      const routerEvent = route as NavigationEnd

      if (!this.routesWithoutNavbar.includes(routerEvent.url)) {
        if (!this.routesWithoutNavbar.includes(routerEvent.urlAfterRedirects))
          this.canShowNavbar = true;
      } else {
        this.canShowNavbar = false;
      }
    });
  }

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login', '/pipokinha'];

  public routeSubscription: Subscription;

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }
}
