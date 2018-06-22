import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";

  isOpen = false;

  ngOnInit() {
    this.isOpen = false;
  }

  openNav(e) {
    this.isOpen = e;
    console.log(this.isOpen);
  }

  closeNav() {
    this.isOpen = false;
  }
}
