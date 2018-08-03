import { Component, OnInit } from "@angular/core";
import { Project } from "../../../core/models/project";
import { ProjectService } from "../../../core/services/project.service";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  projects: Project[];
  copyProjects: Project[] = [];
  descending: boolean = false;
  error: String;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService
      .getAllProjects()
      .subscribe(
        projects => (this.projects = projects),
        err => (this.error = <any>err),
        () => (this.copyProjects = this.projects)
      );
  }

  // sortType(sort: String) {
  //   if (sort === "name") {
  //     this.projects = this.copyProjects.sort(this.sortByProjectName);
  //     console.log(this.copyProjects);
  //   }
  // }

  sortByProjectName() {
    if (this.descending) {
      this.projects.sort((a, b) => 0 - (a.title > b.title ? 1 : -1))
      this.descending = false;
    } else {
      this.projects.sort((a, b) => 0 - (a.title > b.title ? -1 : 1))
      this.descending = true;
    }
    console.log(this.descending);
  }
}
