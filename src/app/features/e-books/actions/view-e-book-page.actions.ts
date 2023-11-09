import { createActionGroup, props } from '@ngrx/store';
export const ViewEBookPageActions = createActionGroup({
  source: 'View EBook Page',
  events: {
    'Select EBook': props<{ id: string }>(),
  },
});
