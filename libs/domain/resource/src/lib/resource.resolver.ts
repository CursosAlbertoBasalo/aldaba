import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Resource } from './models/resource';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<Resource> {
  constructor(private service: ResourceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Resource> {
    return this.service.getResourceById$(route.params.id);
  }
}
