import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { IProject } from "../../../core/models/project";
import { Observable } from "rxjs";
import * as fromReducer from "../../../store/reducers/error.reducers";
import {
  SaveProject,
  PublishProject
} from "../../../store/actions/project.actions";
import { CategoryService } from "../../../core/services/category.service";
import { Category } from "../../../core/models/category";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"]
})
export class ProjectFormComponent implements OnInit {
  project: IProject = new IProject();
  error: Observable<any>;
  categories: Category[];
  getErrors: Observable<any>;
  constructor(
    public router: Router,
    private store: Store<AppState>,
    public categoryService: CategoryService
  ) {
    this.getErrors = store.select(fromReducer.getErrors);
  }

  ngOnInit() {
    this.loadCategories();
    this.getErrors.subscribe(err => {
      this.error = err.message;
    });
  }

  onSave() {
    const payload = {
      title: this.project.title,
      category_id: this.project.category_id,
      project_start: this.project.project_start,
      project_end: this.project.project_end,
      budget: this.project.budget,
      body: this.project.body
    };

    this.store.dispatch(new SaveProject(payload));
  }

  onPublish() {
    const payload = {
      title: this.project.title,
      category_id: this.project.category_id,
      project_start: this.project.project_start,
      project_end: this.project.project_end,
      budget: this.project.budget,
      body: this.project.body
    };

    this.store.dispatch(new PublishProject(payload));
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
