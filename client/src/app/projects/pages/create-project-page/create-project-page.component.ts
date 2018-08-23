import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { IProject } from "../../../core/models/project";

@Component({
  selector: "app-create-project-page",
  templateUrl: "./create-project-page.component.html",
  styleUrls: ["./create-project-page.component.scss"]
})
export class CreateProjectPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
