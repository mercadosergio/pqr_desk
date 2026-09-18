import { FormControl } from '@angular/forms';
import { IPqr } from './pqr.interface';
import { IUser } from './users.interface';

export type PqrActionType = 'message' | 'update';

export interface IComment {
  id: number;
  description: string;
  action_type: string;
  registered_at: string;
  pqr: IPqr;
  user: IUser;
}

export interface ICreateCommentDto {
  description: string;
  action_type: PqrActionType;
}

export interface IFormComment {
  description: FormControl<string>;
  action_type: FormControl<PqrActionType>;
}
