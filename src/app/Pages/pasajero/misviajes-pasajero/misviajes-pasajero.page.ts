import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-misviajes-pasajero',
  templateUrl: './misviajes-pasajero.page.html',
  styleUrls: ['./misviajes-pasajero.page.scss'],
})
export class MisviajesPasajeroPage implements OnInit {

  constructor(private menu: MenuController,
              private navCtrl: NavController,
              private crudViaje: CrudViajeService
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('misviajes-chofer')
    }

    this.cargandoFlag=true;
    this.listar()
    setTimeout(()=>this.cargandoFlag=false,1000)

  }

  viajes : any = [];
  cargandoFlag = false;
  idUsuario = localStorage.getItem('idUsuario')||'';
  async listar() {
    try {
      await this.crudViaje.listarViajesPasajero(this.idUsuario).subscribe(data => {
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

}
