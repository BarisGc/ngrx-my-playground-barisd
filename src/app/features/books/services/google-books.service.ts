import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  // private dummyApi =
  //   'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=Marijn%20Haverbeke';

  constructor(private http: HttpClient) {}

  // TODO: "%20" necessary?
  searchBooks(queryTitle = ''): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(`${this.API_PATH}?orderBy=newest&q=${queryTitle}`)
      .pipe(map((books) => books.items || []));
  }

  retrieveBook(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
  }
}
