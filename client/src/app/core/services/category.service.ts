import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * Models
 */
import { Category } from "../models/category";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  apiUrl = "http://localhost:8000/api/v1/";
  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<Array<Category>>(this.apiUrl + "categories");
  }

}
