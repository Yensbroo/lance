import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Project } from "../models/project";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  apiUrl = "http://localhost:8000/api/v1";
  constructor(private httpClient: HttpClient) { }

  getAllProjects() {
    return this.httpClient.get<Array<Project>>(
      "http://localhost:8000/api/v1/projects"
    );
  }

  getProjectById(id: String) {
    return this.httpClient.get(this.apiUrl + "/project/" + id);
  }

  createProject() {
  }
}
