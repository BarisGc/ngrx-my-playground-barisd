import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  debounceTime,
  skip,
  switchMap,
  takeUntil,
  mergeMap,
} from 'rxjs/operators';
import { GoogleBooksService } from '../services/google-books.service';
import { BookSearchPageActions } from '../actions/book-search-page.actions';
import { Book } from '../models';
import { BookCollectionPageActions } from '../actions/book-collection-page.actions';
import { BookStorageService } from '../services/book-storage.service';
import { BookListPageActions } from '../actions/book-list-page.actions';

@Injectable()
export class BookSearchPageEffects {
  // loadBooks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BookSearchPageActions.searchBooks),
  //     exhaustMap(({ query }) =>
  //       this.booksService.searchBooks(query).pipe(
  //         map(
  //           (books) => BookSearchPageActions.searchSuccess({ books })
  //           // better instead of the code below
  //           // {
  //           //   type: '[Books API] Books Loaded Success',
  //           //   payload: books,
  //           // }
  //         ),

  //         catchError((err) =>
  //           of(
  //             BookSearchPageActions.searchFailure({
  //               errorMsg: `Book Search API failed - The Books Can't be Searched - Error: ${err.message}`,
  //             })
  //           )
  //         ) // This is better compared to "EMPTY"
  //       )
  //     )
  //   )
  // );

  search$ = createEffect(
    () =>
      ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
        this.actions$.pipe(
          ofType(BookSearchPageActions.searchBooks),
          debounceTime(debounce, scheduler),
          switchMap(({ query }) => {
            if (query === '') {
              return empty;
            }

            const nextSearch$ = this.actions$.pipe(
              ofType(BookSearchPageActions.searchBooks),
              skip(1)
            );

            return this.booksService.searchBooks(query).pipe(
              takeUntil(nextSearch$),

              map((books: Book[]) =>
                BookSearchPageActions.searchSuccess({ books })
              ),

              catchError((err) =>
                of(
                  BookSearchPageActions.searchFailure({
                    errorMsg: `Book Search API failed - The Books Can't be Searched - Error: ${err.message}`,
                  })
                )
              ) // This is better compared to "EMPTY"
            );
          })
        )
  );

  storeSearchs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookSearchPageActions.searchSuccess),
      mergeMap(({ books }) =>
        this.storageService.addToLocalStorage(books).pipe(
          map(() => BookListPageActions.storeBooksSuccess({ books })),
          catchError((err) =>
            of(
              BookListPageActions.storeBooksFailure({
                errorMsg: `Storing Books Failed - Error: ${err.message}`,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private booksService: GoogleBooksService,
    private storageService: BookStorageService
  ) {}
}
