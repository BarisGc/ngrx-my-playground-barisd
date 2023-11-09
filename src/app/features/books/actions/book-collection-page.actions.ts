// purpose: to describe the book actions. Book actions include the book list retrieval, and the add and remove book actions.
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../models/book.model';

export const BookCollectionPageActions = createActionGroup({
  source: 'Book Collection Page',
  events: {
    Enter: emptyProps(),
    /**
     * Load Collection Actions
     */
    'Load Collection Success': props<{ books: Book[] }>(),
    'Load Collection Failure': props<{ error: any }>(),

    /**
     * Add Book to Collection Actions
     */
    'Add Book': props<{ book: Book }>(),
    'Add Book Success': props<{ book: Book }>(),
    'Add Book Failure': props<{ book: Book }>(),

    /**
     * Remove Book from Collection Actions
     */
    'Remove Book': props<{ book: Book }>(),
    'Remove Book Success': props<{ book: Book }>(),
    'Remove Book Failure': props<{ book: Book }>(),
  },
});

// 1 - Using Action Creator - Examples
// products-page.actions.ts
// import { createAction, props } from '@ngrx/store';

// // defining an action without payload
// export const opened = createAction('[Products Page] Opened');

// // defining an action with payload using the `props` function
// export const paginationChanged = createAction(
//   '[Products Page] Pagination Changed',
//   props<{ page: number; offset: number }>()
// );

// // defining an action with payload using the props factory
// export const queryChanged = createAction(
//   '[Product Page] Query Changed',
//   (query: string) => ({ query })
// );

//  2 - createActionGroup - Examples
// https://dev.to/ngrx/ngrx-action-group-creator-1deh
// Advantages: Action group creator improves developer experience by reducing code in action files. It eliminates the need to create barrel files or use named imports for actions, define the same action source in multiple places, and write the same name for the event and the action creator twice. It also enforces good action hygiene by using the "[Source] Event" pattern in defining action types.
// Limitations: We can define different names for an event and an action creator using the createAction function in opposite to createActionGroup function.

// const authApiActions = createActionGroup({
//   source: 'Auth API',
//   events: {
//     // defining events with payload using the `props` function
//     'Login Success': props<{ userId: number; token: string }>(),
//     'Login Failure': props<{ error: string }>(),

//     // defining an event without payload using the `emptyProps` function
//     'Logout Success': emptyProps(),

//     // defining an event with payload using the props factory
//     'Logout Failure': (error: Error) => ({ error }),
//   },
// });
