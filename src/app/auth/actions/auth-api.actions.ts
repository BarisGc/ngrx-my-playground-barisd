import {
  props,
  createAction,
  createActionGroup,
  emptyProps,
} from '@ngrx/store';
import { Credentials, User } from '@example-app/auth/models';

export const AuthApiActions = createActionGroup({
  source: 'Auth/Api',
  events: {
    'Login Success': props<{ credentials: Credentials }>(),
    'Login Failure': props<{ error: any }>(),
    'Login Redirect': emptyProps(),
  },
});
