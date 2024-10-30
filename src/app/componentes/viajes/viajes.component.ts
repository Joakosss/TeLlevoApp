import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Viaje } from 'src/app/model/Viaje';
import {CrudViajeService} from 'src/app/servicio/viaje/crud-viaje.service'
import Swal from 'sweetalert2';
import { MapaComponent } from '../mapa/mapa.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent  implements OnInit {
  @Input() viaje: Viaje;
  @Input() chofer:string = '';
  @Input() idUsuario:string|null= '';
  
  constructor(private crudViaje:CrudViajeService,
              private modal:ModalController,
  ) { }

  ngOnInit() {}

  async soliViaje(){
    try {
      const aux = await this.crudViaje.agregarAlViaje(this.viaje.uid||'', this.idUsuario||'')
      Swal.fire({
        icon: 'success',
        title: 'Viaje solicitado con éxito!',
        text: 'Esperamos sea un gran viaje c:',
        heightAuto: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error!',
        text: 'Reintenta solicitar el viaje',
        confirmButtonText: 'Reintentar',
        heightAuto: false,
      });
    }
  }
  async abrirMapa(latitud,longitud) {
    const modal = await this.modal.create({
      component: MapaComponent,
      componentProps: {
        latitud: latitud, // Aquí pasamos el parámetro idViaje al modal,
        longitud:longitud,
      },
      backdropDismiss: true, // Permite cerrar el modal al tocar fuera de él
    });
    return await modal.present();
  }
}
