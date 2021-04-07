import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTemplate {}
