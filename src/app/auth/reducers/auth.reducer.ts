import { createReducer, on } from '@ngrx/store';
import { Credentials, User } from '@example-app/auth/models';
import { AuthApiActions } from '../actions/auth-api.actions';
import { AuthActions } from '../actions/auth.actions';

export const statusFeatureKey = 'status';

export interface State {
  credentials: Credentials | null;
}

export const initialState: State = {
  credentials: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { credentials }) => ({
    ...state,
    credentials,
  })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.credentials;
