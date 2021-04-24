import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'ab-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements AfterViewInit {
  @Input() set initial(value: string) {
    console.log(value);
    if (this.searchInput && !!value) {
      this.searchInput.nativeElement.value = value;
    }
  }
  @Output() search = new EventEmitter<string>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    fromEvent<{ target: { value: string } }>(
      this.searchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event) => event.target.value),
        map((value) => value as string),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((text) => this.search.next(text));
  }
}
