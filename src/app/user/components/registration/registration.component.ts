import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { UserDto } from '../../dtos/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public form = new FormGroup(
    {
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      passwordConfirm: new FormControl('',[Validators.required,Validators.minLength(6)])
    },
    this.passwordMatchValidator
  );

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  public passwordMatchValidator(g: FormGroup){
    let isValid =false;
    if(g.get('password').value === g.get('passwordConfirm').value ) isValid = true; 

    return isValid?null:{mismatch:true};

  }

  public register(){
    if(this.form.valid){
      this.userService.register(this.form.value).subscribe(
        user => {
          console.log(user);
          window.alert("Successfull registration");
          this.form.reset();
        },
        err => {
          console.error(err);
          window.alert("Registration has faild!");

        }
      );
    }
    else{
      console.error("Validation errors");
    }

  }
}
