import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from '@example-app/auth/models';
import * as fromAuth from '@example-app/auth/reducers';
import { LoginPageActions } from '../actions/login-page.actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="(pending$ | async)!"
      [errorMessage]="error$ | async"
    >
    </app-login-form>
  `,
  styles: [],
})
export class LoginPageComponent {
  pending$ = this.store.select(fromAuth.selectLoginPagePending);
  error$ = this.store.select(fromAuth.selectLoginPageError);

  constructor(private store: Store) {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
