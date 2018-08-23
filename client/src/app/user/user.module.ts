import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserSettingsPageComponent } from "./pages/user-settings-page/user-settings-page.component";
import { UserSettingsFormComponent } from "./components/user-settings-form/user-settings-form.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [UserSettingsPageComponent, UserSettingsFormComponent]
})
export class UserModule {}
