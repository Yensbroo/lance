import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * Components as pages
 */
import { ProjectsPageComponent } from "./projects/pages/projects-page/projects-page.component";
import { ProjectPageComponent } from "./projects/pages/project-page/project-page.component";
import { LoginComponent } from "./authentication/login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { RegisteredComponent } from "./authentication/registered/registered.component";
import { CreateProjectPageComponent } from "./projects/pages/create-project-page/create-project-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "opdrachten", component: ProjectsPageComponent },
  { path: "maakopdracht", component: CreateProjectPageComponent },
  { path: "opdracht/:id", component: ProjectPageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "registered", component: RegisteredComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
