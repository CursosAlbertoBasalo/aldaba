import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { Notification } from '../models/notification';

@Component({
  selector: 'ab-notification',
  templateUrl: './notification.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification = { class: '', message: '' };

  show$ = new BehaviorSubject<boolean>(false);

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.show$.next(true);
    timer(3000).subscribe(() => this.onClose());
  }

  onClose() {
    this.show$.next(false);
  }
}
