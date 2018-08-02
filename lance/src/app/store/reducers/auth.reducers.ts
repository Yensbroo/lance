import { User } from '../../core/models/user';

export const initialState: State = {
  isAuthenticated: false,
  user: null
}

export interface State {
  isAuthenticated: boolean;

  user: User | null;

}