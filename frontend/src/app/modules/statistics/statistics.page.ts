import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PqrService } from '../../core/services/pqr.service';
import { UsersService } from '../../core/services/users.service';
import { ClientsService } from '../../core/services/clients.service';
import { types, statuses } from '../../core/mapping-objects';
import { PqrStatus, PqrType } from '../../shared/models/interfaces/pqr.interface';

interface StatisticItem {
  label: string;
  value: string;
  count: number;
  percent: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrl: './statistics.page.css',
})
export default class StatisticsPage {
  private pqrService = inject(PqrService);
  private usersService = inject(UsersService);
  private clientsService = inject(ClientsService);

  types = types;
  statuses = statuses;

  rxPqrs = rxResource({
    stream: () => this.pqrService.getPqrs(),
  });

  rxUsers = rxResource({
    stream: () => this.usersService.getUsers(),
  });

  rxClients = rxResource({
    stream: () => this.clientsService.getClients(),
  });

  total = computed(() => this.rxPqrs.value()?.length ?? 0);
  totalUsers = computed(() => this.rxUsers.value()?.length ?? 0);
  totalClients = computed(() => this.rxClients.value()?.length ?? 0);

  statusStats = computed<StatisticItem[]>(() => {
    const pqrs = this.rxPqrs.value() ?? [];
    return this.statuses.map((status) =>
      this.createItem(
        status.label,
        status.value,
        pqrs.filter((pqr) => pqr.status === status.value).length,
        pqrs.length,
      ),
    );
  });

  typeStats = computed<StatisticItem[]>(() => {
    const pqrs = this.rxPqrs.value() ?? [];
    return this.types.map((type) =>
      this.createItem(
        type.label,
        type.value,
        pqrs.filter((pqr) => pqr.type === type.value).length,
        pqrs.length,
      ),
    );
  });

  private createItem(
    label: string,
    value: PqrStatus | PqrType,
    count: number,
    total: number,
  ): StatisticItem {
    return {
      label,
      value,
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    };
  }
}
