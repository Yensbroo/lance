import { Observable, from } from "rxjs";
import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { AuthenticationService } from "../core/services/authentication.service";

@Injectable()
export class LncHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const token = await this.authenticationService.loadToken();

    let changedRequest = request;

    const headerSettings: { [name: string]: string | string[] } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    if (token) {
      headerSettings["Authorization"] = token;
    }
    headerSettings["Content-Type"] = "application/json";
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader
    });

    return next.handle(changedRequest).toPromise();
  }
}
