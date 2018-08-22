import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Category } from "../../../core/models/category";

@Component({
  selector: "app-project-filter",
  templateUrl: "./project-filter.component.html",
  styleUrls: ["./project-filter.component.scss"]
})
export class ProjectFilterComponent {
  selected = -1;
  @Input()
  categories: Category[];

  @Output()
  sortByCat = new EventEmitter<any>();

  sortByCategory(e) {
    this.sortByCat.emit(e);
  }
}
