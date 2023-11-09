import { BookListPageActions } from './../actions/book-list-page.actions';
import { createReducer, on } from '@ngrx/store';
import { Book } from '../models/book.model';
import { BookSearchPageActions } from '../actions/book-search-page.actions';
import { BookCollectionPageActions } from '../actions/book-collection-page.actions';

export const bookListPageFeatureKey = 'bookListPageFeatureKey';

export interface State {
  loaded: boolean;
  loading: boolean;
  // TODO: Compare to EntityState and check if "books" necessary or "Ids" enough?
  books: Book[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  books: [],
};

export const bookListPageReducer = createReducer(
  initialState,
  on(BookListPageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    BookSearchPageActions.searchSuccess,
    BookCollectionPageActions.loadCollectionSuccess,
    (state, { books }) => ({
      loaded: true,
      loading: false,
      // TODO: Check if books are unique
      books: [...state.books, ...books],
    })
  )
);

export const selectBookList = (state: State) => state.books;

export const selectBookListLastItem = (state: State) =>
  state.books[state.books.length - 1];
