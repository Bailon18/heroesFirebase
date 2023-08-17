import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public loginForm: FormGroup = this.fb.group({
    correo: ['', [ Validators.required, Validators.email] ],
    contrasena: ['', [ Validators.required, Validators.minLength(5)] ],
  });

  constructor( private fb: FormBuilder ){}

  login(){
    
  }
}
