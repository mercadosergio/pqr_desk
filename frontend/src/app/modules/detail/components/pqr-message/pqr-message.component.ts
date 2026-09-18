import { Component, input } from '@angular/core';
import { IComment } from '../../../../shared/models/interfaces/comments.interface';
import { TimeDistancePipe } from '../../../../core/pipes/time-distance-pipe';

@Component({
  imports: [TimeDistancePipe],
  selector: 'app-pqr-message',
  styleUrl: './pqr-message.component.css',
  templateUrl: './pqr-message.component.html',
})
export class PqrMessageComponent {
  message = input.required<IComment>();
}
