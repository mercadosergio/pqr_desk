export type Role = 'agent' | 'supervisor' | 'admin';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  password_hash: string;
}
