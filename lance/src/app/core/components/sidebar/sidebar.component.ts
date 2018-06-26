import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

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
  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}

  openSub() {
    if (this.isOpen) {
      this.isOpen = false;
      (document.querySelector(".arrow") as HTMLInputElement).style.transform =
        "rotate(0)";
    } else {
      this.isOpen = true;
      (document.querySelector(".arrow") as HTMLInputElement).style.transform =
        "rotate(90deg)";
    }
  }

  navClose() {
    this.closeNav.emit(false);
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate([""]);
  }
}
