import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ab-search-box-widget',
  templateUrl: './search-box.widget.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxWidget implements OnInit {
  initial = '';
  current = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('q') || ''),
        filter((q) => this.initial !== q && this.current !== q)
      )
      .subscribe((q) => {
        this.initial = q;
        this.cdr.markForCheck();
      });
  }

  onSearch(searchTerm: string) {
    if (this.current === searchTerm) return;
    this.current = searchTerm;
    if (searchTerm.length >= 2) {
      this.router.navigate(['search'], {
        queryParams: { q: searchTerm },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
