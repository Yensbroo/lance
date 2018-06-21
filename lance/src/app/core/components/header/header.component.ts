import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter(true);
  @Output() modalToggle = new EventEmitter(true);
  constructor() {}

  ngOnInit() {}

  sidebarOpen() {
    this.sidebarToggle.emit(true);
  }

  modalOpen() {}
}
