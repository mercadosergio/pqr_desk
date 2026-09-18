import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import {
  ChangeStatusDto,
  ICreatePqrDto,
  IPqr,
  PqrParams,
} from '../../shared/models/interfaces/pqr.interface';
import { priorities, statuses } from '../mapping-objects';
import { CommentsService } from './comments.service';
import { environment } from '../../../environments/environment';

@Service()
export class PqrService {
  private http = inject(HttpClient);
  private commentsService = inject(CommentsService);
  private apiUrl = `${environment.API_URL}/pqr`;

  getPqrs(filters?: PqrParams) {
    let params = new HttpParams();

    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value && value != '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<IPqr[]>(this.apiUrl, { params });
  }

  getOnePqr(id: number) {
    return this.http.get<IPqr>(`${this.apiUrl}/${id}`);
  }

  createPqr(dto: ICreatePqrDto) {
    return this.http.post<IPqr>(this.apiUrl, dto);
  }

  changeStatus(id: number, dto: ChangeStatusDto) {
    return this.http.patch<IPqr>(`${this.apiUrl}/${id}/estado`, dto);
  }

  changeStatusWithComments(id: number, current: IPqr, dto: ChangeStatusDto, userId?: number) {
    const statusLabel = statuses.find((item) => item.value === dto.status)?.label ?? dto.status;
    const priorityLabel =
      priorities.find((item) => item.value === dto.priority)?.label ?? dto.priority;
    const changes = [
      current.status !== dto.status
        ? this.commentsService.createComment(id, {
            description: `Estado actualizado a '${statusLabel}'.`,
            action_type: 'update',
            ...(userId ? { user_id: userId } : {}),
          })
        : null,
      current.priority !== dto.priority
        ? this.commentsService.createComment(id, {
            description: `Prioridad actualizada a '${priorityLabel}'.`,
            action_type: 'update',
            ...(userId ? { user_id: userId } : {}),
          })
        : null,
    ].filter((request) => request !== null);

    return this.changeStatus(id, dto).pipe(
      switchMap((updatedPqr) =>
        changes.length ? forkJoin(changes).pipe(map(() => updatedPqr)) : of(updatedPqr),
      ),
    );
  }
}
