import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { RegisteredComponent } from './registered/registered.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RegisterComponent, LoginComponent, RegisteredComponent]
})
export class AuthenticationModule {}
