import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import swall from 'sweetalert2';

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

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private firestore: AngularFirestore,
    ){}

    login(){

      const correo = this.loginForm.value.correo;
      const contrasena = this.loginForm.value.contrasena;
  
      this.authService.login(correo, contrasena)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            this.authService.getUserData(user.uid).subscribe((doc) => {
              if (doc.exists) {
                const userData: any = doc.data();
                localStorage.setItem('usuariologeo', JSON.stringify(userData));
                this.route.navigate(['heroes'])
              } else {
                console.log('Usuario no encontrado en Firestore.');
              }
            });
          }
        })
        .catch((error) => {
          swall.fire({
            icon: 'warning',
            confirmButtonColor:'#0275d8',
            html:  `Credenciales incorrectos`,
          })
        });
    }

  
}
