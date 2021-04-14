import { TrackerEntry, TrackerStore } from '@ab/global';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TrackerInterceptor implements HttpInterceptor {
  constructor(private store: TrackerStore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startTimestamp = new Date().getTime();

    this.store.trackEntry({
      category: 'SYSTEM',
      event: 'CALL_START',
      label: request.method + ' @ ' + request.url,
      value: startTimestamp,
    });

    return next.handle(request).pipe(
      tap((res) => {
        if (res.type === 0) return; // cors preflight
        const endTimestamp: number = new Date().getTime();
        const responseTime = endTimestamp - startTimestamp;
        this.store.trackEntry({
          category: 'SYSTEM',
          event: 'CALL_END',
          label: request.method + ' @ ' + request.url,
          value: responseTime,
        });
      }),

      catchError((error: HttpErrorResponse) => {
        const errorEntry: TrackerEntry = {
          category: 'ERROR',
          event: 'CODE_FAULT',
        };
        if (error.error instanceof ErrorEvent) {
          const codeError = error.error;
          errorEntry.label = codeError.message + ' @ ' + codeError.filename;
          errorEntry.value = codeError.lineno;
        } else {
          errorEntry.event = 'CALLER_FAULT';
          if (error.status >= 500) {
            errorEntry.event = 'SERVER_FAULT';
          } else if ([401, 403].includes(error.status)) {
            errorEntry.event = 'AUTH_FAULT';
          }
          if (error.url) errorEntry.label = error.url;
          errorEntry.value = error.status;
        }
        this.store.trackEntry(errorEntry);
        return throwError(error);
      })
    );
  }
}
