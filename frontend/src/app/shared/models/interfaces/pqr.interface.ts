import { FormControl } from '@angular/forms';
import { IClient } from './clients.interface';

export type PqrType = 'petition' | 'complaint' | 'claim';
export type PqrPriority = 'low' | 'medium' | 'high' | 'urgent';
export type PqrStatus = 'received' | 'in_progress' | 'resolved' | 'closed';
export type PqrChannel = 'web' | 'email' | 'in_person';

export interface IPqr {
  id: number;
  type: PqrType;
  title: string;
  description: string;
  category: string;
  priority: PqrPriority;
  status: PqrStatus;
  channel: PqrChannel;
  client: IClient;
  created_at: string;
  updated_at: string;
}

export interface ICreatePqrDto extends Omit<IPqr, 'id' | 'created_at' | 'updated_at' | 'client'> {
  client_id: number;
}

export interface ChangeStatusDto {
  status: PqrStatus;
  priority: PqrPriority;
}

export interface IPqrForm {
  type: FormControl<PqrType>;
  title: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  priority: FormControl<PqrPriority>;
  status: FormControl<PqrStatus>;
  channel: FormControl<PqrChannel>;
}

export interface PqrExpanded extends Omit<IPqr, 'client'> {
  client: IClient;
}
