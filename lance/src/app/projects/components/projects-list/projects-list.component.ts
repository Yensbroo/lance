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
  error: String;
  constructor(private projectService: ProjectService) {}

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

  sortType(sort: String) {
    if (sort === "name") {
      this.projects = this.copyProjects.sort(this.sortByProjectName);
      console.log(this.copyProjects);
    }
  }

  sortByProjectName(p1: Project, p2: Project) {
    if (p1.title > p2.title) return 1;
    else if (p1.title === p1.title) return 0;
    else return -1;
  }
}
