import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Project } from "../../../core/models/project";


@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent {
  @Input()
  projects: Project[];

  @Output() sortByName = new EventEmitter<Project>();
  @Output() sortByBudget = new EventEmitter<Project>();

  sortByProjectName() {
    this.sortByName.emit();
  }

  sortByProjectBudget() {
    this.sortByBudget.emit();
  }
}
