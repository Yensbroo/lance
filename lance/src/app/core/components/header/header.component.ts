import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter(true);

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
    console.log(this.authService.loggedIn());
  }

  sidebarOpen() {
    this.sidebarToggle.emit(true);
  }
}
