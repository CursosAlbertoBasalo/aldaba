import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinct, filter, map } from 'rxjs/operators';
import { TrackerCategories, TrackerEntry } from './models/trackerEntry';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class TrackerStore {
  private store$: Store<TrackerEntry>;

  constructor() {
    this.store$ = new Store<TrackerEntry>({
      category: 'SYSTEM',
      event: 'TRACKER_INIT',
      label: 'aldaba',
    });
  }
  selectActions$() {
    return this.store$.getActions$();
  }
  trackEntry(entry: TrackerEntry) {
    entry.value ?? new Date().getTime();
    this.store$.dispatch({ type: 'TRACK_' + entry.category, payload: entry });
  }
  public getState$() {
    return this.store$.getState$();
  }

  selectCategories$(): Observable<TrackerCategories> {
    return this.store$.getState$().pipe(
      map((s) => s.category),
      distinct()
    );
  }

  selectByEvent$(event: string) {
    const byEvent = (state: TrackerEntry) => state.event === event;
    return this.store$.getState$().pipe(filter(byEvent));
  }

  selectAnyErrors$(): Observable<TrackerEntry> {
    const byErrorCategory = (state: TrackerEntry) => state.category === 'ERROR';
    return this.store$.getState$().pipe(filter(byErrorCategory));
  }
}
