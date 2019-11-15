import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponse } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = new FormGroup(
    {
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    }
  );
  public loading=false as boolean;


  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }

  public login(){
    if(this.form.valid){
      this.loading = true;
      this.authService.login(this.form.value).subscribe(
        (response:AuthResponse) => {
          console.log(response);
         // window.alert("Successfull login");
          this.form.reset();
          this.router.navigate(['/']);
           this.loading = false;

        },
        err => {
          console.error(err);
          window.alert("Login faild!");
          this.loading = false;
        }
      );
    }
    else{
      console.error("Validation errors");
    }
}
}
