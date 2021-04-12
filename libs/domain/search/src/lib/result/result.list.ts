import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Resource } from '../models/resource';

@Component({
  selector: 'ab-result',
  templateUrl: './result.list.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultList {
  @Input() resources: Resource[] = [];
}
