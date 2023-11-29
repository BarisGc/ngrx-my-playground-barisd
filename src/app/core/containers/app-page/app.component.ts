import { Component } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromAuth from '@example-app/auth/reducers';
import * as fromRoot from '@example-app/reducers';
import { AuthActions } from '@example-app/auth/actions/auth.actions';
import { LoginPageActions } from '@example-app/auth/actions/login-page.actions';
import { AuthApiActions } from '@example-app/auth/actions/auth-api.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = of(true);

  showSidenav$: Observable<boolean> = of(false);
  loggedIn$: Observable<boolean> = of(false);

  constructor(private store: Store, private router: Router) {
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.selectLoggedIn);
  }

  ngOnInit() {
    this.checkUserAccess();
    this.handleNavigationLoading();
  }

  handleNavigationLoading() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading$ = of(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading$ = of(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  checkUserAccess() {
    // TODO: Better to use "effects" & "loadUser" like "loadCollection" approach instead of the code below
    const credentials = JSON.parse(localStorage.getItem('credentials')!);
    if (credentials)
      this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
