import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resource } from './models/resource';

@Component({
  templateUrl: './resource.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePage {
  resource: Resource;

  constructor(route: ActivatedRoute) {
    this.resource = route.snapshot.data.resource;
  }
}
