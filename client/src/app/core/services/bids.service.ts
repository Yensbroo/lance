import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IProject } from "../models/project";
import { Bid } from "../models/bid";

@Injectable({
  providedIn: "root"
})
export class BidsService {
  apiUrl = "http://localhost:8000/api/v1";
  constructor(private httpClient: HttpClient) {}

  getBids(id: String) {
    return this.httpClient.get<Array<Bid>>(this.apiUrl + "/bids/" + id);
  }

  placeBid(id, data) {
    return this.httpClient.post<Bid>(this.apiUrl + "/bid/" + id, data);
  }
}
