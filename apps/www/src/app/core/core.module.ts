import { TrackerInterceptor } from '@ab/data';
import { TrackerStore } from '@ab/global';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TrackerInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(router: Router, tracker: TrackerStore) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (routerEvent) =>
          tracker.trackEntry({
            category: 'BUSINESS',
            event: 'NAV',
            label: (routerEvent as NavigationEnd).urlAfterRedirects,
          }),
      });
    if (environment.production === false) {
      // ToDo: Use Redux DevTools
      tracker.selectActions$().subscribe((action) => console.table(action));
    }
    tracker.trackEntry({
      category: 'SYSTEM',
      event: 'APP_STARTED',
      label: JSON.stringify(environment),
    });
  }
}
