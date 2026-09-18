import { Component, computed, effect, inject, signal } from '@angular/core';
import { PqrParams } from '../../shared/models/interfaces/pqr.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { types, priorities, statuses } from '../../core/mapping-objects';
import { PqrService } from '../../core/services/pqr.service';
import { UsersService } from '../../core/services/users.service';
import { ToastService } from '../../core/services/toast.service';
import { PqrCardComponent } from './components/pqr-card/pqr-card.component';

@Component({
  imports: [PqrCardComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export default class HomePage {
  private pqrService = inject(PqrService);
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);

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

  isFiltering = signal(false);

  isLoadingState = computed(() => this.isFiltering() || this.rxPqrs.isLoading());

  rxPqrs = rxResource({
    params: () => this.appliedFilters(),
    stream: ({ params }) => this.pqrService.getPqrs(params),
  });

  constructor() {
    effect(() => {
      if (this.isFiltering() && !this.rxPqrs.isLoading()) {
        this.isFiltering.set(false);
      }

      if (this.rxPqrs.error()) {
        this.toastService.show('No fue posible cargar las solicitudes.', 'error');
      }

      if (this.rxUsers.error()) {
        this.toastService.show('No fue posible cargar los usuarios.', 'error');
      }
    });
  }

  rxUsers = rxResource({
    stream: () => this.usersService.getUsers(),
  });

  toggleFilter(event: Event, filter: keyof PqrParams) {
    const value = (event.target as HTMLSelectElement).value;

    this.filters.update((prev) => ({
      ...prev,
      [filter]: value,
    }));
  }

  applyFilters() {
    this.isFiltering.set(true);
    this.appliedFilters.set(this.filters());
  }
}
