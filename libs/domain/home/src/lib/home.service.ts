import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly categoriesUrl = `https://api-angular-builders.herokuapp.com/v1/categories`;

  constructor(private http: HttpClient) {}

  getCategories$() {
    return this.http
      .get<apiCategories>(this.categoriesUrl)
      .pipe(map((apiResponse) => apiResponse.data));
  }
}
type apiCategories = { data: Category[] };
