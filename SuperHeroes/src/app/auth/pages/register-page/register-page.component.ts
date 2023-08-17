import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {


  public registerForm: FormGroup = this.fb.group({
    correo: ['', [ Validators.required, Validators.email] ],
    contrasena: ['', [ Validators.required, Validators.minLength(5)] ],
    rol: ['Admin', [ Validators.required] ],
  });

  constructor( private fb: FormBuilder ){}

  register(){

    if(this.registerForm.valid){
      
    }
  }
}
