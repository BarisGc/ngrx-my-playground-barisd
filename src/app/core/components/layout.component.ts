import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { closeSidenav } from '../actions/layout.actions';
import { LayoutActions } from '../actions';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container fullscreen (backdropClick)="close()">
      <ng-content></ng-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.5);
      }
    `,
  ],
})
export class LayoutComponent {
  constructor(private store: Store) {}
  close() {
    console.log('test');
    this.store.dispatch(LayoutActions.closeSidenav());
  }
}
