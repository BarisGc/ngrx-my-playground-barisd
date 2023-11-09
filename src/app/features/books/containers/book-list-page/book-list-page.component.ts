import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from '../../services';
import { Observable, tap } from 'rxjs';
import { Book } from '../../models/book.model';

import * as fromBooks from '../../reducers';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
})
export class BookListPageComponent implements OnInit, AfterViewInit {
  books$: Observable<Book[]>;
  constructor(
    private booksService: GoogleBooksService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.books$ = store.select(fromBooks.selectBookList);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}
  selectItem($event: any, item: any) {}

  navigateToSearch() {
    this.router.navigate(['../book-search'], { relativeTo: this.route });
  }
  navigateToCollection() {
    this.router.navigate(['../book-collection'], { relativeTo: this.route });
  }
}
