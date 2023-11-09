import * as fromBookSearchPage from './book-search-page.reducer';
import * as fromBookListPage from './book-list-page.reducer';
import * as fromBookCollectionPage from './book-collection-page.reducer';
import * as fromRoot from '../../../reducers';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import { Book } from '../models/book.model';

export const booksFeatureKey = 'booksFeatureKey';

export interface BooksState {
  [fromBookSearchPage.bookSearchPageFeatureKey]: fromBookSearchPage.State;
  [fromBookListPage.bookListPageFeatureKey]: fromBookListPage.State;
  [fromBookCollectionPage.bookCollectionPageFeatureKey]: fromBookCollectionPage.State;
}

export interface State extends fromRoot.State {
  [booksFeatureKey]: BooksState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: BooksState | undefined, action: Action) {
  return combineReducers({
    [fromBookSearchPage.bookSearchPageFeatureKey]:
      fromBookSearchPage.bookSearchPageReducer,
    [fromBookListPage.bookListPageFeatureKey]:
      fromBookListPage.bookListPageReducer,
    [fromBookCollectionPage.bookCollectionPageFeatureKey]:
      fromBookCollectionPage.bookCollectionPageReducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.booksState$ = state$.pipe(select(getBooksState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectBooksState =
  createFeatureSelector<BooksState>(booksFeatureKey);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectBookListState = createSelector(
  selectBooksState,
  // TODO: type any olmamalı?
  (state: any) => state.bookListPageFeatureKey
);

export const selectBookList = createSelector(
  selectBookListState,
  fromBookListPage.selectBookList
);

/**
 * Just like with the books selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const selectSearchState = createSelector(
  selectBooksState,
  (state) => state.bookSearchPageFeatureKey
);

export const selectFoundedBooks = createSelector(
  selectSearchState,
  fromBookSearchPage.getFoundedBooks
);
export const selectSearchQuery = createSelector(
  selectSearchState,
  fromBookSearchPage.getQuery
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromBookSearchPage.getLoading
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromBookSearchPage.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const selectSearchResults = createSelector(
  selectBookList,
  selectFoundedBooks,
  (storedBooks, foundedBooks) => {
    return [...new Set([...storedBooks, ...foundedBooks])];
  }
);

/**
 * collection selectors
 */

export const selectCollectionState = createSelector(
  selectBooksState,
  (state) => state.bookCollectionPageFeatureKey
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromBookCollectionPage.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromBookCollectionPage.getLoading
);
export const selectCollectionBookIds = createSelector(
  selectCollectionState,
  fromBookCollectionPage.getIds
);

export const selectBookCollectionList = createSelector(
  selectBookList,
  selectCollectionBookIds,
  (storedBooks, collectedBooksIds) => {
    return [...new Set(storedBooks)].filter((Book) =>
      new Set(collectedBooksIds).has(Book.id)
    );
  }
);
