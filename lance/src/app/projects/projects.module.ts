import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsListComponent } from "./components/projects-list/projects-list.component";
import { AppRoutingModule } from "../app-routing.module";
import { CoreModule } from "../core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { ProjectsPageComponent } from "./pages/projects-page/projects-page.component";
import { ProjectDetailComponent } from "./components/project-detail/project-detail.component";
import { ProjectFilterComponent } from "./components/project-filter/project-filter.component";
import { RouterModule } from "@angular/router";
import { FilterPipe } from "./filter.pipe";
import { FormsModule } from "@angular/forms";
import { MomentModule } from "ngx-moment";
import { SortPipe } from "./sort.pipe";
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { CreateProjectPageComponent } from "./pages/create-project-page/create-project-page.component";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MomentModule,
    AppRoutingModule
  ],
  declarations: [
    ProjectsListComponent,
    ProjectPageComponent,
    ProjectsPageComponent,
    ProjectDetailComponent,
    CreateProjectPageComponent,
    ProjectFilterComponent,
    FilterPipe,
    SortPipe,
    ProjectFormComponent
  ],
  exports: [ProjectsListComponent]
})
export class ProjectsModule {}
