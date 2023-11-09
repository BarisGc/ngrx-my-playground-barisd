import { Component } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = true;

  isLoggedIn$: Observable<boolean> = of(false);
  isLoggedOut$: Observable<boolean> = of(true);

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    const userProfile = localStorage.getItem('user');

    if (userProfile) {
      // this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    // this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    // this.store.dispatch(logout());
  }
}
