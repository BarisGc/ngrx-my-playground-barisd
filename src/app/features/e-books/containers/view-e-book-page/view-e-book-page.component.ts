import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { ViewEBookPageActions } from '../../actions/view-e-book-page.actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'app-view-e-book-page',
  templateUrl: './view-e-book-page.component.html',
  styleUrls: ['./view-e-book-page.component.scss'],
})
export class ViewEBookPageComponent {
  actionsSubscription: Subscription;

  constructor(store: Store, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(
        map((params) => ViewEBookPageActions.selectEBook({ id: params['id'] }))
      )
      .subscribe((action) => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
