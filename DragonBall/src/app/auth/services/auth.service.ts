import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}


  register(nombre: string, correo: string, contrasena: string, rol: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(correo, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;

        return this.firestore.collection('users').doc(user?.uid).set({
          nombre: nombre,
          rol: rol,
        });
      });
  }

  login(correo: string, contrasena: string) {
    return this.afAuth.signInWithEmailAndPassword(correo, contrasena);
  }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).get();
  }
  
}
