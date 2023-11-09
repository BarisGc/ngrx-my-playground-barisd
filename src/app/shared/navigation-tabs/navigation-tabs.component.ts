import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Link } from '../models/links';
import { Store } from '@ngrx/store';
import { EBook } from '@rootPath/features/e-books/models/e-book.model';
import { Observable, tap } from 'rxjs';
import * as fromEBooks from '@rootPath/features/e-books/reducers';

@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit, OnChanges {
  // #navigationTabs
  @Input() links: Link[] = [];
  @Input() activeLink = 'stored';
  selectedEBook$!: Observable<EBook>;
  // #cycleorder #cycle #order

  constructor(private store: Store) {
    console.log('constructor');
    this.getInitialStore(store);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  getInitialStore(store: Store) {
    this.selectedEBook$ = store.select(
      fromEBooks.selectSelectedEBook
    ) as Observable<EBook>;
  }
}
