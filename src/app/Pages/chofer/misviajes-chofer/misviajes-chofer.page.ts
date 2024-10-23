import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pasajero } from 'src/app/model/Pasajero';
import { Viaje } from 'src/app/model/Viaje';
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
              private crudPasajero: CrudPasajeroService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('perfil')==='pasajero') {
      this.navCtrl.navigateRoot('misviajes-pasajero')
    }
    this.cargandoFlag=true;
    this.listar()
    setTimeout(()=>this.cargandoFlag=false,1000)
    
  }
  
  viajes : any = [];
  cargandoFlag = false;

  async listar() {
    try {
      await this.crudViaje.listarViajesChofer(localStorage.getItem('idUsuario') || '').subscribe(data => {
        this.viajes = data;
        console.log(this.viajes);
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
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

  /* AQUI VA LA FUNCION QUE LLAMA A LA CAMARA SEGUN EL VIAJE EJ:  CAMARAVIAJE(IDVIAJE:STRING){} */


}
