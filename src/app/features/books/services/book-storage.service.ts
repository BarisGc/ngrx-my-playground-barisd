import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Book } from '../models';

export function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken(
  'example-app-local-storage',
  { factory: storageFactory }
);

@Injectable({ providedIn: 'root' })
export class BookStorageService {
  private collectionKey = 'books-app-myCollection';
  private searchHistoryKey = 'books-app-mySearcHistory';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getCollectionFromLocalStorage(): Observable<Book[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  getSearchHistroyFromLocalStorage(): Observable<Book[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.searchHistoryKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToLocalStorage(records: Book[]): Observable<Book[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: Book[]) => [...value, ...records]),
      tap((value: Book[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  removeFromLocalStorage(ids: Array<string>): Observable<Book[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: Book[]) => value.filter((item) => !ids.includes(item.id))),
      tap((value: Book[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  deleteLocalStorage(): Observable<boolean> {
    return this.supported().pipe(
      tap(() => this.storage.removeItem(this.collectionKey))
    );
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}

// TODO: Not activated
