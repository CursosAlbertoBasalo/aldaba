import { ErrorHandler, Injectable } from '@angular/core';
import { TrackerStore } from './tracker.store';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private tracker: TrackerStore) {}

  handleError(error: Error): void {
    if (!!error.name && error.name === 'HttpErrorResponse') return;
    this.tracker.trackEntry({
      category: 'ERROR',
      event: 'CODE_FAULT',
      label: error.message,
    });
  }
}
