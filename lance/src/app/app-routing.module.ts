import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * Components as pages
 */
import { ProjectsPageComponent } from "./modules/projects/pages/projects-page/projects-page.component";
import { ProjectPageComponent } from "./modules/projects/pages/project-page/project-page.component";
import { LoginComponent } from "./core/components/login/login.component";

const routes: Routes = [
  { path: "projects", component: ProjectsPageComponent },
  { path: "project/:id", component: ProjectPageComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
