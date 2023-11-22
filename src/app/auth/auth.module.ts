import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '@example-app/material';
import {
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
} from './components';
import { LoginPageComponent } from './containers';
import { AuthEffects } from './effects';
import * as fromAuth from '@example-app/auth/reducers';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature({
      name: fromAuth.authFeatureKey,
      reducer: fromAuth.reducers,
    }),
    EffectsModule.forFeature(AuthEffects),
  ],
  declarations: COMPONENTS,
})
export class AuthModule {}
