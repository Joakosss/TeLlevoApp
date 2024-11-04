import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CrearQrComponent } from 'src/app/componentes/crear-qr/crear-qr.component';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { CrudPasajeroService } from 'src/app/servicio/pasajero/crud-pasajero.service';
import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misviajes-chofer',
  templateUrl: './misviajes-chofer.page.html',
  styleUrls: ['./misviajes-chofer.page.scss'],
})
export class MisviajesChoferPage implements OnInit {

  constructor(private navCtrl: NavController,
              private crudViaje: CrudViajeService,
              private modal:ModalController,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('perfil')==='pasajero') {
      this.navCtrl.navigateRoot('misviajes-pasajero')
    }
    this.cargandoFlag=true;
    this.listar().then(() => {
      setTimeout(() => this.cargandoFlag = false, 1000);
    });
  }
  
  viajes : any = [];
  cargandoFlag = false;

  async listar() {
    try {
      await this.crudViaje.listarViajesChofer(localStorage.getItem('idUsuario') || '').subscribe(data => {
        this.viajes = data;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Problemas al compilar tus viajes :C',
        text: 'inténtelo más tarde',
        heightAuto: false
      });
    }
  }



  async finalizarViaje(idViaje:string){
    try {
      await this.crudViaje.modificarEstadoViaje(idViaje);
      Swal.fire({
        icon:'success',
        title: 'Viaje finalizado con éxito!',
        confirmButtonText: 'Aceptar',
        heightAuto: false
      })
    } catch (error) {
      Swal.fire({
        icon:'error',
        title: 'No pudimos finalizar el viaje:C',
        text: 'inténtelo más tarde',
        heightAuto: false
      })
    }
  }
  async eliminarViaje(idViaje:string){
    try {
      Swal.fire({
        title: "Estás seguro?",
        text: "No podrás recuperar este viaje!",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.crudViaje.eliminarViaje(idViaje);
          Swal.fire({
            icon:'success',
            title: 'Viaje eliminado con éxito!',
            confirmButtonText: 'Aceptar',
            heightAuto: false
          })
        }
      });
    } catch (error) {
      Swal.fire({
        icon:'error',
        title: 'No pudimos eliminar el viaje:C',
        text: 'inténtelo más tarde',
        heightAuto: false
      })
    }
  }

  async abrirModal(idViaje) {
    const modal = await this.modal.create({
      component: CrearQrComponent,
      componentProps: {
        idViaje: idViaje // Aquí pasamos el parámetro idViaje al modal
      },
      backdropDismiss: true, // Permite cerrar el modal al tocar fuera de él
    });
    return await modal.present();
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
