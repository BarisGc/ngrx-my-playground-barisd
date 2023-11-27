import { Component } from '@angular/core';
import { EBook } from '../../models/e-book.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromEBooks from '@example-app/features/e-books/reducers';
@Component({
  selector: 'app-e-book-collection-page',
  templateUrl: './e-book-collection-page.component.html',
  styleUrls: ['./e-book-collection-page.component.scss'],
})
export class EBookCollectionPageComponent {
  collectedEBooks$!: Observable<EBook[]>;
  constructor(private store: Store) {
    this.collectedEBooks$ = this.store.select(fromEBooks.selectEBookCollection);
  }
}
