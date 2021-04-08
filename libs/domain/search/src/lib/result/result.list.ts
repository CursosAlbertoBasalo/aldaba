import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-result',
  templateUrl: './result.list.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultList implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
