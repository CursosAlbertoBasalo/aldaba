import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Resource } from './models/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly resourcesUrl =
    'https://api-angularbuilders.herokuapp.com/v1/resources';
  constructor(private http: HttpClient) {}
  getResourceById$(resourceId: string) {
    return this.http
      .get<{ data: Resource }>(`${this.resourcesUrl}/${resourceId}`)
      .pipe(map((result) => result.data));
  }
}
