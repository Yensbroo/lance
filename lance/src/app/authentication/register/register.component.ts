import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";
import { User } from '../../core/models/user';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  message = "";
  data: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  onRegister() {


    this.authService.register(this.user).subscribe(
      res => {
        this.data = res;
        console.log(res);
        this.router.navigate(["registered"]);
      },
      err => {
        this.message = err.error;
        console.log(err);
      }
    );
  }
}
