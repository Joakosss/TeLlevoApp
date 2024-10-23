import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viaje } from 'src/app/model/Viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class CrudViajeService {

  constructor(private afs: AngularFirestore,
    private navCtrl: NavController
  ) { }

  grabar(viaje: Viaje) {
    return this.afs.collection('viaje').add(viaje);
  }

  listar(): Observable<Viaje[]> {
    return this.afs.collection<Viaje>('viaje').valueChanges({ idField: 'uid' })
  }

  modificarViaje(viaje: Viaje) {
    return this.afs.collection('viaje').doc(viaje.uid).update({
      destino: viaje.destino,
      hora_inicio: viaje.hora_inicio,
      punto_encuentro: viaje.punto_encuentro,
      valor: viaje.valor,
      numPasajeros: viaje.numPasajeros,
    });
  }

  eliminarViaje(idViaje : string) {
    return this.afs.collection('viaje').doc(idViaje).delete();
  }

  /*   agregarAlViaje(id: string, idPasajero: string){
    const viajeRef = this.afs.collection('viaje').doc(id);
    viajeRef.update({
      pasajeros : firebase.firestore.FieldValue.arrayUnion(idPasajero)
      })
      } */

  agregarAlViaje(id: string, idPasajero: string) {
    const viaje = this.afs.collection('viaje').doc(id);

    return viaje.ref.get().then(dato => {
      if (dato.exists) {
        const data = dato.data() as Viaje
        const pasajeros = data.pasajeros || [];
        if (!pasajeros.includes(idPasajero)) {
          pasajeros.push(idPasajero);
          data.contadorPasajeros = (data.contadorPasajeros || 0) - 1;
          return viaje.update({ pasajeros, contadorPasajeros: data.contadorPasajeros });
        } else {
          alert("ya estas en el viaje")
          return Promise.resolve();
        }
      } else {
        alert("error raro")
        return Promise.resolve();
      }
    })
  }


  listarViajesChofer(idChofer: string) {
    return this.afs.collection('viaje', ref => ref.where('chofer', '==', idChofer)).valueChanges({idField: 'uid'})};
  
  listarViajesPasajero(idPasajero: string) {
    return this.afs.collection('viaje', ref => ref.where('pasajeros', 'array-contains', idPasajero)).valueChanges({ idField: 'uid' });
  }
  
  modificarEstadoViaje(idViaje : string) {
    return this.afs.collection('viaje').doc(idViaje).update({
      finalizado:true,
    });
  }

}
