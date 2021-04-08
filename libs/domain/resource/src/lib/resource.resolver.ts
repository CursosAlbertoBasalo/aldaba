import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<boolean> {
  constructor(private service: ResourceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }
}
