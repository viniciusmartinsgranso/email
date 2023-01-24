import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { filter } from 'rxjs/operators';
import { UserProxy } from '../models/proxies/user.proxy';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.verifyLogin().then();
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

  public canLogin: boolean = false;

  public canShowNavbar: boolean = false;

  public routesWithoutNavbar: string[] = ['/login'];

  public routeSubscription: Subscription;

  public async ngOnDestroy(): Promise<void> {
    this.routeSubscription.unsubscribe();
  }

  public async verifyLogin(): Promise<void> {
    const loggedUser = await this.userService.get();

    if (!loggedUser) {
      return void await this.router.navigateByUrl('/login');
    }
  }
}
