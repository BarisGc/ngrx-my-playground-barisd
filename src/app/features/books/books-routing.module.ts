import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookCollectionPageComponent } from './containers/book-collection-page/book-collection-page.component';
import { BookListPageComponent } from './containers/book-list-page/book-list-page.component';
import { BookSearchPageComponent } from './containers/book-search-page/book-search-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-search',
    pathMatch: 'full',
  },
  {
    path: 'book-list',
    component: BookListPageComponent,
    data: { title: 'Book List' },
  },
  {
    path: 'book-collection',
    component: BookCollectionPageComponent,
    // TODO: title works?
    data: { title: 'Book Collection' },
  },
  {
    path: 'book-search',
    component: BookSearchPageComponent,
    // TODO: title works?
    data: { title: 'Book Search' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
