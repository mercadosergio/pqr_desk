import { Component, inject } from '@angular/core';
import { PqrService } from '../../../../core/services/pqr.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PqrCardComponent } from '../pqr-card/pqr-card.component';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  imports: [PqrCardComponent],
  selector: 'app-list',
  styleUrl: './list.component.css',
  templateUrl: './list.component.html',
})
export class ListComponent {
  private pqrService = inject(PqrService);
  private usersService = inject(UsersService);

  rxPqrs = rxResource({
    stream: () => this.pqrService.getPqrs(),
  });

  rxUsers = rxResource({
    stream: () => this.usersService.getUsers(),
  });
}
