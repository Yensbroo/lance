import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsListComponent } from "./components/projects-list/projects-list.component";
import { AppRoutingModule } from "../../app-routing.module";
import { CoreModule } from "../../core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { ProjectPageComponent } from "./pages/project-page/project-page.component";
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

@NgModule({
  imports: [CommonModule, CoreModule, HttpClientModule],
  declarations: [ProjectsListComponent, ProjectPageComponent, ProjectsPageComponent, ProjectDetailComponent],
  exports: [ProjectsListComponent]
})
export class ProjectsModule {}