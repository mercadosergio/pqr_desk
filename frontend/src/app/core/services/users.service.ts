import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/models/interfaces/users.interface';

@Service()
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/users`;

  getUsers() {
    return this.http.get<IUser[]>(this.apiUrl);
  }
}
