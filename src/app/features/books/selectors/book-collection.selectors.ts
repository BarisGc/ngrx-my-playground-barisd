// purpose: Create the book list and collection selectors to ensure we get the correct information from the store. As you can see, the selectBookCollection selector combines two other selectors in order to build its return value.
// how works: When using the createSelector and createFeatureSelector functions @ngrx/store keeps track of the latest arguments in which your selector function was invoked. Because selectors are pure functions, the last result can be returned when the arguments match without reinvoking your selector function. This can provide performance benefits, particularly with selectors that perform expensive computation. This practice is known as memoization.

// import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { Book } from '../models/book.model';

// export const selectBookListState = createFeatureSelector<Array<Book>>(
//   'bookListPageFeatureKey'
// );

// export const selectBookCollectionState = createFeatureSelector<Array<string>>(
//   'bookCollectionPageFeatureKey'
// );

// export const selectBookCollection = createSelector(
//   selectBookListState,
//   selectBookCollectionState,
//   (books, collection) => {
//     return collection.map((id) => books.find((book) => book.id === id)!);
//   }
// );
