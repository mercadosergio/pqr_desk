import { Component, inject, input, signal } from '@angular/core';
import { IPqr, PqrPriority, PqrStatus } from '../../../../shared/models/interfaces/pqr.interface';
import { IUser } from '../../../../shared/models/interfaces/users.interface';
import {
  priorities,
  PriorityControl,
  StatusControl,
  statuses,
} from '../../../../core/mapping-objects';
import { TimeDistancePipe } from '../../../../core/pipes/time-distance-pipe';
import { PqrService } from '../../../../core/services/pqr.service';

@Component({
  imports: [TimeDistancePipe],
  selector: 'app-pqr-card',
  styleUrl: './pqr-card.component.css',
  templateUrl: './pqr-card.component.html',
})
export class PqrCardComponent {
  pqr = input.required<IPqr>();
  agents = input.required<IUser[]>();

  pqrService = inject(PqrService);

  priorities: PriorityControl[] = priorities;
  statuses: StatusControl[] = statuses;
  selectedPriority = signal<PqrPriority | null>(null);

  getCurrentPriority(): PqrPriority {
    return this.selectedPriority() ?? this.pqr().priority;
  }

  onPriorityChange(event: Event): void {
    const priority = (event.target as HTMLSelectElement).value as PqrPriority;
    this.selectedPriority.set(priority);
  }

  getPriorityColor(priority: PqrPriority): string {
    return this.priorities.find((item) => item.value === priority)?.color ?? 'inherit';
  }

  changeStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value as PqrStatus;
    this.pqrService.changeStatus(this.pqr().id, status).subscribe({
      next: (data) => {},
      error: () => {},
    });
  }
}
