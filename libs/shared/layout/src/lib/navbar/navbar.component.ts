import { TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification';

@Component({
  selector: 'ab-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  notification$: Observable<Notification>;
  loading$: Observable<boolean>;

  constructor(store: TrackerStore) {
    // ToDo: create specific notifications by error event kind
    const error$ = store.selectAnyErrors$().pipe(
      map(() => ({
        class: 'is-danger',
        message:
          'There was an error!. Review your data and retry. If persists we will fix it ASAP!',
      }))
    );
    // ToDo: use another store for user notifications
    const success$ = store.selectByEvent$('NEW_RESOURCE').pipe(
      map((trackEntry) => ({
        class: 'is-success',
        message: trackEntry.label || 'Success',
      }))
    );
    this.notification$ = merge(error$, success$);

    const callStart$ = store.selectByEvent$('CALL_START').pipe(map(() => true));
    const callEnd$ = store.selectByEvent$('CALL_END').pipe(map(() => false));
    this.loading$ = merge(callStart$, callEnd$);
  }
}
