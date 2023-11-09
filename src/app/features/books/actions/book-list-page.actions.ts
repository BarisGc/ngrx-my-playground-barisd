// purpose: to describe the book actions. Book actions include the book list retrieval, and the add and remove book actions.
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const BookListPageActions = createActionGroup({
  source: 'Book List Page',
  events: {
    Enter: emptyProps(),
    /**
     * Load List Actions
     */
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ errorMsg: any }>(),

    /**
     * Store List Actions
     */
    'Store Books Success': props<{ books: Book[] }>(),
    'Store Books Failure': props<{ errorMsg: any }>(),
  },
});
