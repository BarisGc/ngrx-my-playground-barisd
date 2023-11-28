import { AuthModule } from './auth/auth.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './core/containers/app-page/app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CommonModule } from '@angular/common';
import { metaReducers, rootReducers } from './reducers';
import { MaterialModule } from './material';
import { NotFoundPageComponent } from './core/containers';
import { CoreModule } from './core';
import { UserEffects, RouterEffects } from './core/effects';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MaterialModule,

    AuthModule, // AuthModule.forRoot() // alternative #alt1
    AppRoutingModule,

    /**
     * The StoreModule.forRoot() method registers the global providers needed to access the Store throughout your application.
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(rootReducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    // TODO: Activate instead
    // StoreModule.forRoot(rootReducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     // strictStateImmutability and strictActionImmutability are enabled by default
    //     strictStateSerializability: true,
    //     strictActionSerializability: true,
    //     strictActionWithinNgZone: true,
    //     strictActionTypeUniqueness: true,
    //   },
    // }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx EBook Store App',
      // In a production build you would want to disable the Store Devtools
      logOnly: !isDevMode(),
    }),

    EffectsModule.forRoot(UserEffects, RouterEffects),
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Let's #cover what you did:

// Defined actions to express events.
// Defined two reducer functions to manage different parts of the state.
// Registered the global state container that is available throughout your application.
// Defined the state, as well as selectors that retrieve specific parts of the state.
// Created two distinct components, as well as a service that fetches from the Google Books API.
// Injected the Store and Google Books API services to dispatch actions and select the current state.
