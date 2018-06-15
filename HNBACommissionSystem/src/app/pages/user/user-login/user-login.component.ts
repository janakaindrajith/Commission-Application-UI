import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/user/authentication.service';
import { IUser } from '../../../shared/models/user/user.model';

import { USER } from '../../../shared/config/user';
import { ToastrService } from "toastr-ng2/toastr";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isLoading: boolean;
  User: IUser;

  UserName: string;
  Password: string;
  message: string;

  constructor(private router: Router, private toastrService: ToastrService , private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();

    // this.UserName = "tda";
    // this.Password = "tda";
  }

  showSuccess(message) {
    this.toastrService.success(message, 'Success!');
  }

  showError(message) {
    this.toastrService.error(message, 'Oops!');
  }

  showWarning(message) {
    this.toastrService.warning(message, 'Alert!');
  }

  showInfo(message) {
    this.toastrService.info(message);
  }

  public loginWithWindowsUser() {
    this.isLoading = true;
    this.authenticationService.GetWindowsUserName()
      .subscribe((data) => {
        console.log('data   '+data);
        

        let windowsUserName: string = data;
        this.isLoading = false;

        this.authenticationService.checkAndLoadWindowsUser(windowsUserName)
          .subscribe((data2) => {


            this.isLoading = false;
            console.log(data2);
            this.User = data2
            if (this.User.UserName != null) {
              USER.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password);
              console.log(USER.USER_AUTH_TOKEN);

              localStorage.setItem("currentCOMUser", JSON.stringify(this.User));
              localStorage.setItem("currentCOMUserToken", USER.USER_AUTH_TOKEN);
              this.router.navigate(['/', 'mainDashboard']);

            } else {
              this.message = "Invalid User name or Password...";
              
            }
          }),
          ((err) => {
            console.log(err);
            this.message = "Error while user login...";
          });


      }),
      ((err) => {
        console.log(err);
        this.message = "Error while user login...";
      });



  }

  public validateUser() {

    try {

      this.isLoading = true;
      
                //this.router.navigate(['/', 'mainDashboard']);
      
          this.authenticationService.CheckAndLoadUser(this.UserName, this.Password)
            .subscribe((data) => {
      
      
              this.isLoading = false;
              console.log(data);
              this.User = data
              if (this.User.UserName != null) {
                USER.USER_AUTH_TOKEN = 'Basic ' + btoa(this.User.UserName + ':' + this.User.Password);
                console.log(USER.USER_AUTH_TOKEN);
                console.log('xx');
                localStorage.setItem("currentCOMUser", JSON.stringify(this.User));
                localStorage.setItem("currentCOMUserToken", USER.USER_AUTH_TOKEN);
                this.router.navigate(['/', 'index']);
      
              } else {
                this.message = "Invalid User name or Password...";
                this.showWarning("Invalid User name or Password...");
              }
            }),
            ((err) => {
              console.log(err);
              this.message = "Error while user login...";
              alert('');
            });
      
    } catch (error) {
      this.showWarning(error);
    }

  }
}
