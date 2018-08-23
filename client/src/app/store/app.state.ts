import { IProject } from "../core/models/project";
import { User } from "../core/models/user";
import { Error } from "../core/models/error";
import { Bid } from "../core/models/bid";

export interface AppState {
  authState: AuthState;
  projectState: ProjectState;
  errorState: ErrorState;
  bidState: BidState;
}

export interface ProjectState {
  projects: IProject[];
  project: IProject[];
}

export interface AuthState {
  user: User[];
  isAuthenticated: boolean;
  errorMessage: String;
}

export interface ErrorState {
  message: Error[];
}

export interface BidState {
  bids: Bid[];
}
