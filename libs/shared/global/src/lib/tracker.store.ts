import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TrackEntry } from './models/trackeEntry';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class TrackerStore {
  private store$: Store<TrackEntry>;

  constructor() {
    this.store$ = new Store<TrackEntry>({
      category: 'SYSTEM',
      event: 'TRACKER_INIT',
    });
  }
  selectActions$() {
    return this.store$.getActions$();
  }
  trackEntry(entry: TrackEntry) {
    entry.value ?? new Date().getTime();
    this.store$.dispatch({ type: 'TRACK_' + entry.category, payload: entry });
  }

  selectByEvent$(event: string) {
    const byEvent = (state: TrackEntry) => state.event === event;
    return this.store$.getState$().pipe(filter(byEvent));
  }

  selectAnyErrors$(): Observable<TrackEntry> {
    const byErrorCategory = (state: TrackEntry) => state.category === 'ERROR';
    return this.store$.getState$().pipe(filter(byErrorCategory));
  }
}
