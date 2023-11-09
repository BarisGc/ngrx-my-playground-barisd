import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Link } from '@rootPath/shared/models/links';
import { EBook } from '../../models/e-book.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-e-books',
  templateUrl: './e-books.component.html',
  styleUrls: ['./e-books.component.scss'],
})
export class EBooksComponent implements OnInit, OnDestroy {
  links: Link[] = [];
  activeLink = '';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setInitialState();
  }

  setInitialState() {
    this.setInitialNavigationTabs();
  }

  setInitialNavigationTabs() {
    this.links = [
      {
        url: 'stored',
        disabled: false,
      },
      {
        url: 'find',
        disabled: false,
      },
      {
        url: 'collection',
        disabled: false,
      },
      {
        url: 'view',
        disabled: false,
      },
    ];
  }

  ngOnDestroy(): void {
    console.log('ebooks page comp destroyed');
  }
}
