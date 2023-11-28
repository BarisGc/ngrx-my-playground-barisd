import { createAction, createActionGroup, emptyProps } from '@ngrx/store';

// export const logout = createAction('[Auth] Logout');
// export const logoutConfirmation = createAction('[Auth] Logout Confirmation');
// export const logoutConfirmationDismiss = createAction(
//   '[Auth] Logout Confirmation Dismiss'
// );

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Logout: emptyProps(),
    'Logout Confirmation': emptyProps(),
    'Logout Confirmation Dismiss': emptyProps(),
  },
});
