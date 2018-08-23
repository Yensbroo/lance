import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { MaterialModule } from "../material/material.module";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { MomentModule } from "ngx-moment";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LncHttpInterceptor } from "../authentication/http.interceptor";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LncHttpInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    JwtModule,
    MomentModule
  ],
  declarations: [HeaderComponent, SidebarComponent, FooterComponent],
  exports: [HeaderComponent, SidebarComponent]
})
export class CoreModule {}
