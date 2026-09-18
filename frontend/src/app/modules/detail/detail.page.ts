import { Component, inject, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ChangeStatusDto,
  PqrPriority,
  PqrStatus,
} from '../../shared/models/interfaces/pqr.interface';
import { PqrService } from '../../core/services/pqr.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { TimeDistancePipe } from '../../core/pipes/time-distance-pipe';
import { priorities, statuses } from '../../core/mapping-objects';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';
import { ToastService } from '../../core/services/toast.service';
import { PqrMessageComponent } from './components/pqr-message/pqr-message.component';
import { CommentsService } from '../../core/services/comments.service';

interface PqrChanges {
  status?: PqrStatus;
  priority?: PqrPriority;
}

@Component({
  imports: [
    RouterLink,
    FontAwesomeModule,
    TimeDistancePipe,
    ReplyFormComponent,
    PqrMessageComponent,
  ],
  selector: 'app-detail',
  styleUrl: './detail.page.css',
  templateUrl: './detail.page.html',
})
export default class DetailPage {
  faEnvelope = faEnvelope;
  private pqrService = inject(PqrService);
  private commentsService = inject(CommentsService);
  private toastService = inject(ToastService);

  id = input.required<number>();

  rxPqr = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.pqrService.getOnePqr(params),
  });

  rxComments = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.commentsService.getCommentsByPqr(params, 'message'),
  });

  priorities = priorities;
  statuses = statuses;

  changes = linkedSignal<PqrChanges>(() => ({
    status: this.rxPqr.value()?.status,
    priority: this.rxPqr.value()?.priority,
  }));

  toggleSelect(event: Event, filter: keyof PqrChanges) {
    const value = (event.target as HTMLSelectElement).value;

    this.changes.update((prev) => ({
      ...prev,
      [filter]: value,
    }));
  }

  updatePqr() {
    const current = this.rxPqr.value();
    if (!current) {
      return;
    }

    this.pqrService
      .changeStatusWithComments(this.id(), current, this.changes() as ChangeStatusDto)
      .subscribe({
        next: () => {
          this.toastService.show('PQR actualizada correctamente.');
          this.rxPqr.reload();
        },
        error: () => {
          this.toastService.show('No fue posible actualizar la PQR.', 'error');
        },
      });
  }
}
