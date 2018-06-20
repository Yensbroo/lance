import { Component, OnInit } from "@angular/core";
import { Project } from "../../../../core/models/project";
import { ProjectService } from "../../../../core/services/project.service";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  public projects: Array<Project>;
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      err => console.log(err)
    );
  }
}
