import {
  PqrChannel,
  PqrPriority,
  PqrStatus,
  PqrType,
} from '../shared/models/interfaces/pqr.interface';

export interface PriorityControl {
  label: string;
  value: PqrPriority;
  color: string;
}

export const priorities: PriorityControl[] = [
  { label: 'Baja', value: 'low', color: '#2e7d32' },
  { label: 'Media', value: 'medium', color: '#b7791f' },
  { label: 'Alta', value: 'high', color: '#c2410c' },
  { label: 'Urgente', value: 'urgent', color: '#b91c1c' },
];

export interface StatusControl {
  label: string;
  value: PqrStatus;
}

export const statuses: StatusControl[] = [
  { label: 'Cerrada', value: 'closed' },
  { label: 'En gestión', value: 'in_progress' },
  { label: 'Recibida', value: 'received' },
  { label: 'Resuelta', value: 'resolved' },
];

export interface Channel {
  label: string;
  value: PqrChannel;
}

export const channels: Channel[] = [
  { label: 'Email', value: 'email' },
  { label: 'En persona', value: 'in_person' },
  { label: 'Web', value: 'web' },
];

export interface TypeControl {
  label: string;
  value: PqrType;
}

export const types: TypeControl[] = [
  { label: 'Reclamo', value: 'claim' },
  { label: 'Queja', value: 'complaint' },
  { label: 'Petición', value: 'petition' },
];
