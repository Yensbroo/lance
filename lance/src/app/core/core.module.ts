import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { MaterialModule } from "../material/material.module";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class CoreModule {}
