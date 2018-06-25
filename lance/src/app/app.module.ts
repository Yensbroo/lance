import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

/**
 * Modules
 */
import { CoreModule } from "./core/core.module";
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from "./app-routing.module";
import { ProjectsModule } from "./projects/projects.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { LandingComponent } from "./home/landing/landing.component";
import { OpdrachtComponent } from "./home/opdracht/opdracht.component";
import { BiedenComponent } from "./home/bieden/bieden.component";
import { CategoriesComponent } from "./home/categories/categories.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    OpdrachtComponent,
    BiedenComponent,
    CategoriesComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProjectsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
