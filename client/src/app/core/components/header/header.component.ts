import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  Input
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { User } from "../../models/user";
import { Store } from "../../../../../node_modules/@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable } from "../../../../../node_modules/rxjs";
import { Logout } from "../../../store/actions/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() user: Observable<any>;
  @Input() isAuthenticated: boolean;
  @Output() sidebarToggle = new EventEmitter(true);


  constructor(private authService: AuthenticationService, public router: Router, private store: Store<AppState>) { }

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
  }



  sidebarOpen() {
    this.sidebarToggle.emit(true);
  }

  logout() {
    this.store.dispatch(new Logout);
  }

}
