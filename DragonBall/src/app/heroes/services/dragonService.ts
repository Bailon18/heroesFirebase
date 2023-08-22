import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter, map } from 'rxjs';
import { DragonBall } from '../model/dragon-ball';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor(private firestore: AngularFirestore) {}

  guardar(heroe: any): Promise<any> {

    return this.firestore.collection('dragonball').add(heroe)
      .then((docRef) => {
        return docRef;
      })
      .catch((error) => {
        throw error;
      });
  }

  listar(): Observable<DragonBall[]> {
    return this.firestore.collection('dragonball').snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const data = snap.payload.doc.data() as DragonBall;
          const id = snap.payload.doc.id;
          return { ...data, id: id };
        });
      })
    );
  }

  buscar(id: string): Observable<DragonBall> {
    return this.firestore.collection('dragonball').doc<DragonBall>(id).valueChanges().pipe(
      map(heroe => {
        if (heroe) {
          return heroe as DragonBall;
        } else {
          throw new Error('Héroe no encontrado');
        }
      })
    );
  }

  actualizar(id: string, datosActualizados: any): Promise<void> {
    return this.firestore.collection('dragonball').doc(id).update(datosActualizados);
  }

  eliminar(id: string): Promise<void> {
    return this.firestore.collection('dragonball').doc(id).delete();
  }

}
