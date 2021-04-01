import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ab-ui-section',
  templateUrl: './section.template.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTemplate implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
