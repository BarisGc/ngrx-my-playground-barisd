// import * as fromAuth from './reducers';
// import { authReducer } from './reducers';
// import { EffectsModule } from '@ngrx/effects';
// import { AuthEffects } from './effects/auth.effects';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule, // alternative to RouterModule.forChild([{ path: '', component: LoginComponent }]),

    // StoreModule.forFeature('auth', authReducer),
    // EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent],
  // exports: [LoginComponent],
})
export class AuthModule {}

// alternative #alt1 to implement AuthModule and its router  using RouterModule.forChild([{ path: '', component: LoginComponent }]) instead of using AuthRoutingModule
// @NgModule({
//   imports: [
//       RouterModule.forChild([{path: '', component: LoginComponent}]),
//   ],
//   declarations: [LoginComponent],
//   exports: [LoginComponent]
// })
// export class AuthModule {
//   static forRoot(): ModuleWithProviders<AuthModule> {
//       return {
//           ngModule: AuthModule,
//           providers: [
//             AuthService,
//               AuthGuard
//           ]
//       }
//   }
// }
