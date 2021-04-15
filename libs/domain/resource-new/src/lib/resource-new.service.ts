import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';
import { Resource } from './models/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourceNewService {
  private readonly categoriesUrl = `https://api-angularbuilders.herokuapp.com/v1/categories`;
  private readonly resourcesUrl = `https://api-angularbuilders.herokuapp.com/v1/resources`;

  constructor(private http: HttpClient) {}

  getCategories$() {
    return this.http
      .get<{ data: Category[] }>(this.categoriesUrl)
      .pipe(map((result) => result.data));
  }
  postNewResource$(newResource: Resource) {
    return this.http
      .post<{ data: Resource }>(`${this.resourcesUrl}/`, newResource)
      .pipe(map((result) => result.data));
  }
}
