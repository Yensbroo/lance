import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project';
import { Category } from '../../../core/models/category';
import { ProjectService } from '../../../core/services/project.service';
import { CategoryService } from '../../../core/services/category.service'

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
  projects: Project[] = [];
  categories: Category[];
  descending: boolean = false;
  error: String;

  constructor(private projectService: ProjectService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllProjects();
    this.loadCategories();
  }

  getAllProjects() {
    this.projectService
      .getAllProjects()
      .subscribe(
        projects => {
          this.projects = projects;
        },
        err => (this.error = <any>err)
      );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories =>
      (this.categories = categories),
      err => (this.error = <any>err))
  }

  sortByProjectName() {
    if (this.descending) {
      this.projects.sort((a, b) => 0 - (a.title > b.title ? 1 : -1))
      this.descending = false;
    } else {
      this.projects.sort((a, b) => 0 - (a.title > b.title ? -1 : 1))
      this.descending = true;
    }
  }

  sortByProjectBudget() {
    if (this.descending) {
      this.projects.sort((a, b) => 0 - (a.budget > b.budget ? 1 : -1))
      this.descending = false;
    } else {
      this.projects.sort((a, b) => 0 - (a.budget > b.budget ? -1 : 1))
      this.descending = true;
    }
  }

  sortByCategory(e: any) {
    if (!e) {
      return this.projects;
    }
    this.projects = this.projects.filter(projects => projects.category.slug.toLocaleLowerCase().indexOf(e.target.value) !== -1)
  }
}
