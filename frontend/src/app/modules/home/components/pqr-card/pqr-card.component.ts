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
  selectedStatus = signal<PqrStatus | null>(null);

  getCurrentPriority(): PqrPriority {
    return this.selectedPriority() ?? this.pqr().priority;
  }

  getCurrentStatus(): PqrStatus {
    return this.selectedStatus() ?? this.pqr().status;
  }

  onPriorityChange(event: Event): void {
    const priority = (event.target as HTMLSelectElement).value as PqrPriority;
    this.selectedPriority.set(priority);
    this.updatePqr();
  }

  getPriorityColor(priority: PqrPriority): string {
    return this.priorities.find((item) => item.value === priority)?.color ?? 'inherit';
  }

  changeStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value as PqrStatus;
    this.selectedStatus.set(status);
    this.updatePqr();
  }

  updatePqr() {
    this.pqrService
      .changeStatus(this.pqr().id, {
        status: this.getCurrentStatus(),
        priority: this.getCurrentPriority(),
      })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: () => {},
      });
  }
}
