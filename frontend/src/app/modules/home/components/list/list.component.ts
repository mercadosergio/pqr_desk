import { Component, computed, inject, signal } from '@angular/core';
import { PqrService } from '../../../../core/services/pqr.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PqrCardComponent } from '../pqr-card/pqr-card.component';
import { UsersService } from '../../../../core/services/users.service';
import { priorities, statuses, types } from '../../../../core/mapping-objects';
import {
  PqrPriority,
  PqrStatus,
  PqrType,
} from '../../../../shared/models/interfaces/pqr.interface';

@Component({
  imports: [PqrCardComponent],
  selector: 'app-list',
  styleUrl: './list.component.css',
  templateUrl: './list.component.html',
})
export class ListComponent {
  private pqrService = inject(PqrService);
  private usersService = inject(UsersService);

  types = types;
  priorities = priorities;
  statuses = statuses;
  selectedType = signal<PqrType | ''>('');
  selectedPriority = signal<PqrPriority | ''>('');
  selectedStatus = signal<PqrStatus | ''>('');

  rxPqrs = rxResource({
    stream: () =>
      this.pqrService.getPqrs({
        type: this.selectedType(),
        priority: this.selectedPriority(),
        status: this.selectedStatus(),
      }),
  });

  rxUsers = rxResource({
    stream: () => this.usersService.getUsers(),
  });

  filteredPqrs = computed(() => this.rxPqrs.value() ?? []);

  filterByType(event: Event): void {
    this.selectedType.set((event.target as HTMLSelectElement).value as PqrType | '');
  }

  filterByPriority(event: Event): void {
    this.selectedPriority.set((event.target as HTMLSelectElement).value as PqrPriority | '');
  }

  filterByStatus(event: Event): void {
    this.selectedStatus.set((event.target as HTMLSelectElement).value as PqrStatus | '');
  }

  clearFilters(): void {
    this.selectedType.set('');
    this.selectedPriority.set('');
    this.selectedStatus.set('');
  }
}
