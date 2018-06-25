import { Component, OnInit } from "@angular/core";

import { CategoryService } from "../../core/services/category.service";
import { Category } from "../../core/models/category";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"]
})
export class CategoriesComponent implements OnInit {
  public categories: Array<Category>;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      err => console.log(err)
    );
  }
}
