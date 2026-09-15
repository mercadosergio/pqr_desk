import { IPqr } from './pqr.interface';
import { IUser } from './users.interface';

export interface IComment {
  id: number;
  description: string;
  action_type: string;
  registered_at: string;
  pqr: number;
  user: number | null;
}

export interface CommentExpanded extends Omit<IComment, 'pqr' | 'user'> {
  pqr: IPqr;
  user: IUser | null;
}
