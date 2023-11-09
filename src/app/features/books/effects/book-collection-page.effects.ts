import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookCollectionPageActions } from '../actions/book-collection-page.actions';
import { Book } from '../models/book.model';
import { BookStorageService } from '../services/book-storage.service';

@Injectable()
export class BookCollectionPageEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.storageService.supported()),
    { dispatch: false }
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookCollectionPageActions.enter),
      switchMap(() =>
        this.storageService.getCollectionFromLocalStorage().pipe(
          map((books: Book[]) =>
            BookCollectionPageActions.loadCollectionSuccess({ books })
          ),
          catchError((error) =>
            of(BookCollectionPageActions.loadCollectionFailure({ error }))
          )
        )
      )
    )
  );

  addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookCollectionPageActions.addBook),
      mergeMap(({ book }) =>
        this.storageService.addToLocalStorage([book]).pipe(
          map(() => BookCollectionPageActions.addBookSuccess({ book })),
          catchError(() =>
            of(BookCollectionPageActions.addBookFailure({ book }))
          )
        )
      )
    )
  );

  removeBookFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookCollectionPageActions.removeBook),
      mergeMap(({ book }) =>
        this.storageService.removeFromLocalStorage([book.id]).pipe(
          map(() => BookCollectionPageActions.removeBookSuccess({ book })),
          catchError(() =>
            of(BookCollectionPageActions.removeBookFailure({ book }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: BookStorageService
  ) {}
}
