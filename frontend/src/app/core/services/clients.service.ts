import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IClient } from '../../shared/models/interfaces/clients.interface';

@Service()
export class ClientsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/clients`;

  getClients() {
    return this.http.get<IClient[]>(this.apiUrl);
  }
}
