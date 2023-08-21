import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, filter, map } from 'rxjs';
import { Superheroe } from '../model/super-heroe';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  constructor(private firestore: AngularFirestore) {}

  guardarHeroe(heroe: any): Promise<any> {
  
    return this.firestore.collection('heroes').add(heroe)
      .then((docRef) => {
        return docRef;
      })
      .catch((error) => {
        throw error;
      });
  }

  listarHeroes(): Observable<Superheroe[]> {
    return this.firestore.collection('heroes').snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const data = snap.payload.doc.data() as Superheroe;
          const id = snap.payload.doc.id;
          return { ...data, id: id }; // Asignar id después del operador de propagación
        });
      })
    );
  }
  
  obtenerHeroePorId(id: string): Observable<Superheroe> {
    return this.firestore.collection('heroes').doc<Superheroe>(id).valueChanges().pipe(
      map(heroe => {
        if (heroe) {
          return heroe as Superheroe;
        } else {
          throw new Error('Héroe no encontrado');
        }
      })
    );
  }

  actualizarHeroe(id: string, datosActualizados: any): Promise<void> {
    return this.firestore.collection('heroes').doc(id).update(datosActualizados);
  }
  
  eliminarHeroe(id: string): Promise<void> {
    return this.firestore.collection('heroes').doc(id).delete();
  }

}
