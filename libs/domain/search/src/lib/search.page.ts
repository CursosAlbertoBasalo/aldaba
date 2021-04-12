import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Resource } from './models/resource';
import { SearchService } from './search.service';

@Component({
  templateUrl: './search.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit {
  resources$!: Observable<Resource[]>;

  constructor(private route: ActivatedRoute, private service: SearchService) {}

  ngOnInit(): void {
    this.resources$ = this.route.queryParamMap.pipe(
      map((queryParams) => queryParams.get('q') || ''),
      switchMap((q) => this.service.getResourceByQuery$(q))
    );
  }
}
