import { Card } from '@ab/ui';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-ui-card',
  templateUrl: './card.template.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTemplate {
  @Input() card: Card = { title: '', description: '' };
}
