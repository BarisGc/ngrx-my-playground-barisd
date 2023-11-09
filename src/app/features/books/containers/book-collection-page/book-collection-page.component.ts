import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromBooks from '../../reducers';
import { BookCollectionPageActions } from '../../actions/book-collection-page.actions';
import { Book } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-collection-page',
  templateUrl: './book-collection-page.component.html',
  styleUrls: ['./book-collection-page.component.scss'],
})
export class BookCollectionPageComponent {
  bookCollection$ = of([]) as any;
  // bookCollection$ = this.store.select(selectBookCollection);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookCollection$ = store.select(fromBooks.selectBookCollectionList);
  }
  removeFromCollection(book: Book) {
    this.store.dispatch(BookCollectionPageActions.removeBook({ book }));
  }

  navigateToSearch() {
    this.router.navigate(['../book-search'], { relativeTo: this.route });
  }
}
