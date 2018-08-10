import { Project } from '../../core/models/project';
import { State, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectActionTypes, All } from '../actions/project.actions';
import { AppState } from '../app.state';


export interface ProjectState {
  projects: null,
  project: null,
}

export const initialState: ProjectState = {
  projects: null,
  project: null,
}



export function reducer(state = initialState, action: All) {
  switch (action.type) {
    case ProjectActionTypes.GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        projects: action.payload,
        error: null
      }
    }
    case ProjectActionTypes.GET_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        error: null
      }
    }
    default: {
      return state
    }
  }
}

export const getProjectState = createFeatureSelector<ProjectState>('projectState');

export const getProjects = createSelector(
  getProjectState,
  (state: ProjectState) => state
)