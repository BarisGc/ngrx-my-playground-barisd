// purpose: to handle actions that alter the user's book collection.
import { createReducer, on } from '@ngrx/store';
import { BookCollectionPageActions } from '../actions/book-collection-page.actions';

export const bookCollectionPageFeatureKey = 'bookCollectionPageFeatureKey';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const bookCollectionPageReducer = createReducer(
  initialState,
  on(BookCollectionPageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),
  on(BookCollectionPageActions.loadCollectionSuccess, (_state, { books }) => ({
    loaded: true,
    loading: false,
    ids: books.map((book) => book.id),
  })),
  /**
   * Case1: Optimistically add book to collection.
   * Case2: If this succeeds there's nothing to do.
   * Case3: If this fails we revert state by removing the book.
   *
   * `on` supports handling multiple types of actions
   */
  on(
    BookCollectionPageActions.addBookSuccess,
    BookCollectionPageActions.removeBookFailure,
    (state, { book }) => {
      // a condition to avoid duplicate book IDs.
      if (state.ids.indexOf(book.id) > -1) {
        return state;
      }
      return {
        ...state,
        ids: [...state.ids, book.id],
      };
    }
  ),
  /**
   * Case1: Optimistically remove book from collection.
   * Case2: If addBook fails, we "undo" adding the book.
   */
  on(
    BookCollectionPageActions.removeBook,
    BookCollectionPageActions.addBookFailure,
    (state, { book }) => ({
      ...state,
      ids: state.ids.filter((id) => id !== book.id),
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
