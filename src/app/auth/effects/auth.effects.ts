import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Credentials } from '@example-app/auth/models';
import { AuthService } from '@example-app/auth/services';
import { LogoutConfirmationDialogComponent } from '@example-app/auth/components';
import { AuthActions } from '../actions/auth.actions';
import { LoginPageActions } from '../actions/login-page.actions';
import { AuthApiActions } from '../actions/auth-api.actions';
import { UserActions } from '@example-app/core/actions';
// import { UserActions } from '@example-app/core/actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      map((action) => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth).pipe(
          map((credentials) => AuthApiActions.loginSuccess({ credentials })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap((action) => {
          localStorage.setItem(
            'credentials',
            JSON.stringify(action.credentials)
          );
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginRedirect, AuthActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map((result) => {
        if (result) {
          localStorage.removeItem('credentials');
          return AuthActions.logout();
        }
        return AuthActions.logoutConfirmationDismiss();
      })
    )
  );

  logoutIdleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
