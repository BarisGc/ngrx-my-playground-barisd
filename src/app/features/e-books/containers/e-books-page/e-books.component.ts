import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { NavigationTab } from '../../models/e-book-navigation-tab';
import * as fromNavigationTabs from '@example-app/features/e-books/reducers';

@Component({
  selector: 'app-e-books',
  templateUrl: './e-books.component.html',
  styleUrls: ['./e-books.component.scss'],
})
export class EBooksComponent implements OnInit, OnDestroy {
  // navigationTabs$ = Observable<NavigationTab[]>;
  navigationTabs$!: Observable<NavigationTab[]>;

  activeLink = '';
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.setInitialState();
  }

  setInitialState() {
    this.setInitialNavigationTabs();
  }

  setInitialNavigationTabs() {
    this.navigationTabs$ = this.store.select(
      fromNavigationTabs.selectNavigationTabs
    );
  }

  ngOnDestroy(): void {
    console.log('ebooks page comp destroyed');
  }
}
