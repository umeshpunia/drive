import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!:FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authSer:AuthService
  ) { }

  ngOnInit() {
    this.validations()
  }

  validations(){
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login(){
    let fData=this.loginForm.value

    this.authSer.login(fData).subscribe(res=>{
      console.log(res);
    })
  }

  // getter
  get email(){
    return this.loginForm.controls['email'] as FormArray
  }
  get password(){
    return this.loginForm.controls['password'] as FormArray
  }

}
