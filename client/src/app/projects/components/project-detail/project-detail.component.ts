import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../core/services/project.service";
import { IProject } from "../../../core/models/project";
import { User } from "../../../core/models/user";
import { Bid } from "../../../core/models/bid";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html",
  styleUrls: ["./project-detail.component.scss"]
})
export class ProjectDetailComponent implements OnInit {
  @Input()
  project: IProject[];
  @Input()
  isAuthenticated: boolean;
  @Input()
  user: User[];
  @Input()
  countdownTime: String[];
  @Output()
  placeBid = new EventEmitter<Bid>();

  ngOnInit() {}

  submit() {
    this.placeBid.emit();
  }
}