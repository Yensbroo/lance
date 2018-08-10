import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project';
import { Observable } from 'rxjs'
import { Category } from '../../../core/models/category';
import { ProjectService } from '../../../core/services/project.service';
import { CategoryService } from '../../../core/services/category.service'
import { Store } from '../../../../../node_modules/@ngrx/store';
import { AppState, ProjectState } from '../../../store/app.state';
import * as fromReducer from '../../../store/reducers/project.reducers';
import { ProjectActionTypes } from '../../../store/actions/project.actions';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  projects: Observable<Project[]>;
  categories: Category[];
  getProjects: Observable<any>
  descending: boolean = false;
  error: String;

  constructor(private categoryService: CategoryService, private store: Store<AppState>) {
    this.getProjects = store.select(fromReducer.getProjects);
  }

  ngOnInit() {
    this.loadCategories();
    this.loadProjects().then(() => {
      this.getProjects.subscribe((projects) => {
        console.log(projects)
        this.projects = projects.projects;

      })
    })

  }

  loadProjects() {
    return new Promise((resolve, reject) => {
      this.store.dispatch({ type: ProjectActionTypes.GET_PROJECTS });
      resolve();
    })
  }



  loadCategories() {
    this.categoryService.getCategories().subscribe(categories =>
      (this.categories = categories),
      err => (this.error = <any>err))
  }

  // sortByProjectName() {
  //   if (this.descending) {
  //     this.projects.sort((a, b) => 0 - (a.title > b.title ? 1 : -1))
  //     this.descending = false;
  //   } else {
  //     this.projects.sort((a, b) => 0 - (a.title > b.title ? -1 : 1))
  //     this.descending = true;
  //   }
  // }

  // sortByProjectBudget() {
  //   if (this.descending) {
  //     this.projects.sort((a, b) => 0 - (a.budget > b.budget ? 1 : -1))
  //     this.descending = false;
  //   } else {
  //     this.projects.sort((a, b) => 0 - (a.budget > b.budget ? -1 : 1))
  //     this.descending = true;
  //   }
  // }

  // sortByCategory(e: any) {
  //   if (!e) {
  //     return this.projects;
  //   }
  //   this.projects = this.projects.filter(projects => projects.category.slug.toLocaleLowerCase().indexOf(e.target.value) !== -1)
  // }
}
