import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swall from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {


  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required] ],
    correo: ['', [ Validators.required, Validators.email] ],
    contrasena: ['', [ Validators.required, Validators.minLength(6)] ],
    rol: ['Admin', [ Validators.required] ],
  });

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
    ){}

  isValidField(field: string): boolean | null {
    return (
      this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `El campo ${field} es requerido`;
        case 'minlength':
          return `El campo ${field} minimo 6 digitos`;
        case 'email':
          return `El campo ${field} no tiene el formato correo`;
      }
    }
    return null;
  }


  register(){

    if(this.registerForm.valid){

      const nombre = this.registerForm.value.nombre;
      const correo = this.registerForm.value.correo;
      const contrasena = this.registerForm.value.contrasena;
      const rol = this.registerForm.value.rol;

      this.authService.register(nombre,correo, contrasena, rol).then(() =>{
        swall.fire({
          icon: 'success',
          confirmButtonColor:'#0275d8',
          html:  `Se registro correctamente al usuario:  <strong>${this.registerForm.value.nombre}</strong>`,
        })
        this.route.navigate(['/auth/login'])
      }).catch((error) => {
        console.log(error)
      }
      )
    }
  }
}
