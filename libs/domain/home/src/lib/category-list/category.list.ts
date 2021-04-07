import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '../models/category';

@Component({
  selector: 'ab-category-list',
  templateUrl: './category.list.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList {
  @Input() categories: Category[] = [];

  header = {
    heroClass: 'is-danger',
    title: 'Resources for Angular developers',
    subtitle: 'Coming soon...',
  };

  // ToDo: move to a Pipe
  getCardFrom(category: Category) {
    return {
      title: category.name,
      description: category.description,
      link: '/category/' + category.id,
    };
  }
}
