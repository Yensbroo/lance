import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../../core/services/project.service";
import { Project } from "../../../../core/models/project";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  public project: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.params["id"];
    this.getProjectById(id);
  }

  getProjectById(id: String): void {
    this._projectService.getProjectById(id).subscribe(
      project => {
        this.project = project;
      },
      err => console.log(err)
    );
  }
}
