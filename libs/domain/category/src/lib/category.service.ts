import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';
import { Resource } from './models/resource';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categoriesUrl = `https://api-angular-builders.herokuapp.com/v1/categories`;
  constructor(private http: HttpClient) {}
  getCategoryById$(categoryId: string) {
    return this.http
      .get<{ data: Category }>(`${this.categoriesUrl}/${categoryId}`)
      .pipe(map((result) => result.data));
  }
  getResourcesByCategoryId$(categoryId: string) {
    return this.http
      .get<{ data: Resource[] }>(
        `${this.categoriesUrl}/${categoryId}/resources`
      )
      .pipe(map((result) => result.data));
  }
}
