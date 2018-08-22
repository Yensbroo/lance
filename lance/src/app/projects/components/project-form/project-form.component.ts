import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"]
})
export class ProjectFormComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
}
