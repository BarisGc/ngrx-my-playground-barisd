import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, User } from '@example-app/auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login({ username, password }: Credentials): Observable<Credentials> {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    if (username !== 'ngrx' || password !== 'Password10') {
      return throwError(() => 'Invalid username or password');
    }

    return of({ username, password });
  }
}
