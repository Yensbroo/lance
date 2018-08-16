import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IProject } from "../../../core/models/project";

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent {
  @Input()
  projects: IProject;

  @Output()
  sortByName = new EventEmitter<IProject>();
  @Output()
  sortByBudget = new EventEmitter<IProject>();

  sortByProjectName() {
    this.sortByName.emit();
  }

  sortByProjectBudget() {
    this.sortByBudget.emit();
  }
}
