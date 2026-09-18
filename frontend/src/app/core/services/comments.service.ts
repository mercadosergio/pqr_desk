import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IComment,
  ICreateCommentDto,
  PqrActionType,
} from '../../shared/models/interfaces/comments.interface';

@Service()
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/pqr`;

  getCommentsByPqr(id: number, actionType?: PqrActionType) {
    let params = new HttpParams();

    if (actionType) {
      params = params.set('action_type', actionType);
    }

    return this.http.get<IComment[]>(`${this.apiUrl}/${id}/seguimiento`, { params });
  }

  createComment(id: number, dto: ICreateCommentDto) {
    return this.http.post<IComment>(`${this.apiUrl}/${id}/seguimiento`, dto);
  }
}
