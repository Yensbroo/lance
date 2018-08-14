import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../core/services/project.service";
import { Project } from "../../../core/models/project";
import { User } from "../../../core/models/user";


@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project[];
  @Input() isAuthenticated: boolean;
  @Input() user: User[];
  @Output() startTimer = new EventEmitter<Project>();

  ngOnInit() {
    this.startCountdown();
  }
  startCountdown() {
    this.startTimer.emit();
  }
}
