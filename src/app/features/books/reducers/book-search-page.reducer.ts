// purpose: to handle the retrieval of the book list from the state and consequently, update the state.
import { createReducer, createSelector, on } from '@ngrx/store';
import { Book, generateInitialBook } from '../models';
import { BookSearchPageActions } from '../actions/book-search-page.actions';
import { selectBookList } from './book-list-page.reducer';

export const bookSearchPageFeatureKey = 'bookSearchPageFeatureKey';

export interface State {
  books: Book[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  books: [],
  loading: false,
  error: '',
  query: '',
};

export const bookSearchPageReducer = createReducer(
  initialState,
  on(BookSearchPageActions.searchBooks, (state, { query }) => {
    return query === ''
      ? {
          books: [],
          loading: false,
          error: '',
          query,
        }
      : {
          ...state,
          loading: true,
          error: '',
          query,
        };
  }),
  on(BookSearchPageActions.searchSuccess, (state, { books }) => ({
    loading: false,
    error: '',
    query: state.query,
    books,
  })),
  on(BookSearchPageActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

//  TODO: Check if these are selector factories
export const getFoundedBooks = (state: State) => state.books;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
