import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../core/services/project.service";
import { Project } from "../../../core/models/project";


@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project[];
  @Output() startTimer = new EventEmitter<Project>();

  ngOnInit() {
    this.startCountdown();
  }
  startCountdown() {
    this.startTimer.emit();
  }
}
