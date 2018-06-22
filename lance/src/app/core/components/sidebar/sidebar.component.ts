import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  @Output() closeNav = new EventEmitter(false);

  links: Array<any> = [
    {
      title: "projects"
    }
  ];
  isOpen = false;
  ngOnInit() {}

  openSub() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  navClose() {
    this.closeNav.emit(false);
  }
}
