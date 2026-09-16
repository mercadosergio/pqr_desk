import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IPqr, PqrStatus } from '../../shared/models/interfaces/pqr.interface';
import { environment } from '../../../environments/environment';

@Service()
export class PqrService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/pqr`;

  getPqrs() {
    return this.http.get<IPqr[]>(this.apiUrl);
  }

  changeStatus(id: number, status: PqrStatus) {
    return this.http.patch<IPqr>(`${this.apiUrl}/${id}/estado`, { status });
  }
}
