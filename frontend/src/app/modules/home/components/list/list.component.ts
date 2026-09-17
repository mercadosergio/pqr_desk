import { Component, inject, signal } from '@angular/core';
import { PqrService } from '../../../../core/services/pqr.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PqrCardComponent } from '../pqr-card/pqr-card.component';
import { UsersService } from '../../../../core/services/users.service';
import { priorities, statuses, types } from '../../../../core/mapping-objects';
import { PqrParams } from '../../../../shared/models/interfaces/pqr.interface';

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

  filters = signal<PqrParams>({
    priority: '',
    status: '',
    type: '',
  });

  appliedFilters = signal<PqrParams>({
    priority: '',
    status: '',
    type: '',
  });

  rxPqrs = rxResource({
    params: () => this.appliedFilters(),
    stream: ({ params }) => this.pqrService.getPqrs(params),
  });

  rxUsers = rxResource({
    stream: () => this.usersService.getUsers(),
  });

  // filteredPqrs = computed(() => this.rxPqrs.value() ?? []);

  toggleFilter(event: Event, filter: keyof PqrParams) {
    const value = (event.target as HTMLSelectElement).value;

    this.filters.update((prev) => ({
      ...prev,
      [filter]: value,
    }));
  }

  applyFilters() {
    this.appliedFilters.set(this.filters());
  }
}
