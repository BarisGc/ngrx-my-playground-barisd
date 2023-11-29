import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthActions } from '@example-app/auth/actions/auth.actions';

import { Store } from '@ngrx/store';
import { LayoutActions } from '../actions';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container fullscreen (backdropClick)="closeSidenav()">
      <mat-sidenav
        #sidenav
        [opened]="showSidenav"
        (keydown.escape)="closeSidenav()"
      >
        <mat-nav-list>
          <app-nav-item
            (navigate)="closeSidenav()"
            *ngIf="loggedIn"
            routerLink="e-books"
            icon="library_books"
          >
            E-Books
          </app-nav-item>
          <app-nav-item (navigate)="closeSidenav()" icon="account_circle">
            Sign In
          </app-nav-item>
          <app-nav-item
            (navigate)="logout()"
            *ngIf="loggedIn"
            icon="exit_to_app"
          >
            Sign Out
          </app-nav-item>
        </mat-nav-list>
      </mat-sidenav>
      <app-toolbar (openMenu)="openSidenav()">E-Book Module</app-toolbar>
      <div class="spinner-container" *ngIf="loading">
        <mat-spinner></mat-spinner>
      </div>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.03);
      }
      mat-sidenav {
        width: 300px;
      }
    `,
  ],
})
export class LayoutComponent {
  @Input() loading = false;
  @Input() showSidenav = false;
  @Input() loggedIn = false;

  constructor(private store: Store) {}

  closeSidenav() {
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
