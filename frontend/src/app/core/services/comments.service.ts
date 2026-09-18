import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  IComment,
  ICreateCommentDto,
} from '../../shared/models/interfaces/comments.interface';

@Service()
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/pqr`;

  getCommentsByPqr(id: number) {
    return this.http.get<IComment[]>(`${this.apiUrl}/${id}/seguimiento`);
  }

  createComment(id: number, dto: ICreateCommentDto) {
    return this.http.post<IComment>(`${this.apiUrl}/${id}/seguimiento`, dto);
  }
}
