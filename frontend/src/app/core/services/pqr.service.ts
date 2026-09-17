import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import {
  ChangeStatusDto,
  ICreatePqrDto,
  IPqr,
  PqrParams,
} from '../../shared/models/interfaces/pqr.interface';
import { environment } from '../../../environments/environment';

@Service()
export class PqrService {
  private http = inject(HttpClient);
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
}
