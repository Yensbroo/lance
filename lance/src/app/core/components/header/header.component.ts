import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { User } from "../../models/user";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter(true);
  public user: String;

  constructor(private authService: AuthenticationService) {}

  public prevScroll = window.pageYOffset;

  @HostListener("window:scroll")
  onScroll() {
    const currentScroll = window.pageYOffset;

    if (this.prevScroll > currentScroll) {
      (document.querySelector(".header") as HTMLInputElement).style.top = "0";
    } else {
      (document.querySelector(".header") as HTMLInputElement).style.top =
        "-75px";
    }

    this.prevScroll = currentScroll;
  }

  ngOnInit() {
    const data = this.authService.getUser();
    this.user = data;
  }

  sidebarOpen() {
    this.sidebarToggle.emit(true);
  }
}
