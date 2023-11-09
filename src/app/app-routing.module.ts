import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'e-books',
    pathMatch: 'full',
  },
  {
    path: 'e-books',
    loadChildren: () =>
      import('./features/e-books/e-books.module').then((m) => m.EBooksModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./features/books/books.module').then((m) => m.BooksModule),
    // canActivate: [AuthGuard]
  },

  //   {
  //     path: 'courses',
  //     loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  //     canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
