import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EBook } from '../models/e-book.model';

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
export class EBookStorageService {
  private collectionKey = 'e-books-app-myCollection';

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getCollectionFromLocalStorage(): Observable<EBook[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  addToLocalStorage(records: EBook[]): Observable<EBook[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: EBook[]) => [...value, ...records]),
      tap((value: EBook[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  removeFromLocalStorage(ids: Array<string>): Observable<EBook[]> {
    return this.getCollectionFromLocalStorage().pipe(
      map((value: EBook[]) => value.filter((item) => !ids.includes(item.id))),
      tap((value: EBook[]) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(value))
      )
    );
  }

  deleteCollectionKeyFromLocalStorage(): Observable<boolean> {
    return this.supported().pipe(
      tap(() => this.storage.removeItem(this.collectionKey))
    );
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}
}

// TODO: Not activated
