import { Project } from '../core/models/project';
import { User } from '../core/models/user';
import * as fromAuthReducer from '../store/reducers/auth.reducers';
import * as fromProjectReducer from '../store/reducers/project.reducers';
import * as fromErrorReducer from '../store/reducers/error.reducers'


export interface AppState {
  authState: AuthState
  projectState: ProjectState;
  error: ErrorState;
}

export interface ProjectState {
  projects: Project[];
  project: Project[];
}

export interface AuthState {
  user: User[],
  isAuthenticated: boolean,
  errorMessage: String
}

export interface ErrorState {
  message: String;
}
