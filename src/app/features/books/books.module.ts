import { NgModule } from '@angular/core';
import { BookComponent } from './components/book.component';
import { BooksComponent } from './books.component';
import { BookListPageComponent } from './containers/book-list-page/book-list-page.component';
import * as fromBooks from './reducers';

import { SharedModule } from 'src/app/shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BookCollectionPageComponent } from './containers/book-collection-page/book-collection-page.component';
import { BookSearchPageComponent } from './containers/book-search-page/book-search-page.component';
import { BookSearchPageEffects } from './effects/book-search-page.effects';
import { EffectsModule } from '@ngrx/effects';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MaterialModule } from 'src/app/material/material.module';
import { StoreModule } from '@ngrx/store';
import { BookCollectionPageEffects } from './effects/book-collection-page.effects';

export const COMPONENTS = [BookComponent];

export const CONTAINERS = [
  BooksComponent,
  BookListPageComponent,
  BookCollectionPageComponent,
  BookSearchPageComponent,
];

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    BooksRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(fromBooks.booksFeatureKey, fromBooks.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature(BookSearchPageEffects, BookCollectionPageEffects),
    PipesModule,
  ],
  declarations: [...COMPONENTS, ...CONTAINERS],
})
export class BooksModule {}
