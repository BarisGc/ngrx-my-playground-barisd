import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Book } from '../models/book.model';

export const BookSearchPageActions = createActionGroup({
  source: 'Book Search Page',
  events: {
    Enter: emptyProps(),
    /**
     * Search Actions
     */
    'Search Books': props<{ query: string }>(),
    'Search Success': props<{
      books: Book[]; //this is a "payload:ReadonlyArray<Book>";
    }>(),
    'Search Failure': props<{ errorMsg: string }>(),
  },
});

// alternative the code above
// export const searchSuccess = createAction(
//   '[Books API] Search Success',
//   props<{ books: Book[] }>()
// );

// export const searchFailure = createAction(
//   '[Books API] Search Failure',
//   props<{ errorMsg: string }>()
// );

// Example-Guide
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
