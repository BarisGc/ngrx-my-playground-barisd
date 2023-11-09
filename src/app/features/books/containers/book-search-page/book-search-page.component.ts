import { Component } from '@angular/core';
import { BookSearchPageActions } from '../../actions/book-search-page.actions';
import { GoogleBooksService } from '../../services/google-books.service';
import { Store } from '@ngrx/store';
import { BookCollectionPageActions } from '../../actions/book-collection-page.actions';
import { Observable, of, take, tap } from 'rxjs';
import { Book } from '../../models/book.model';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromBooks from '../../reducers';

@Component({
  selector: 'app-book-search-page',
  templateUrl: './book-search-page.component.html',
  styleUrls: ['./book-search-page.component.scss'],
})
export class BookSearchPageComponent {
  foundedBooks$: Observable<Book[]>;
  constructor(
    private booksService: GoogleBooksService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.foundedBooks$ = this.store
      .select(fromBooks.selectFoundedBooks)
      .pipe(tap((value) => console.log(value)));

    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));
    this.books$ = store.select(fromBooks.selectSearchResults);
    this.loading$ = store.select(fromBooks.selectSearchLoading);
    this.error$ = store.select(fromBooks.selectSearchError);
  }
  ngOnInit() {
    // (This should probably be handled by NgRx Effects, which you can read about here. For the sake of this demo, NgRx Effects is not being included).
    // this.booksService
    //   .getBooks()
    //   .subscribe((books) =>
    //     this.store.dispatch(searchBook.retrievedBookList({ books }))
    //   );
    this.setInitialState();
  }

  setInitialState() {
    this.setInitialSearch();
  }

  setInitialSearch() {
    // this.store.dispatch(
    //   BookSearchPageActions.searchBooks({
    //     query: 'Marijn%20Haverbeke',
    //   })
    // );
  }

  byCollectionAdd(book: Book) {
    this.store.dispatch(BookCollectionPageActions.addBook({ book }));
  }

  navigateToList() {
    this.router.navigate(['../book-list'], { relativeTo: this.route });
  }

  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  search(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value;
    this.store.dispatch(BookSearchPageActions.searchBooks({ query }));
  }
}
