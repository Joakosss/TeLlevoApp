import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CrudChoferService } from 'src/app/servicio/chofer/crud-chofer.service';

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
              private crudViaje: CrudViajeService,
              private crudChofer: CrudChoferService,
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('misviajes-chofer')
    }

    this.cargandoFlag=true;
    this.listar().then(() => {
      setTimeout(() => this.cargandoFlag = false, 1000);
    });

  }

  viajes : any = [];
  cargandoFlag = false;
  idUsuario = localStorage.getItem('idUsuario')||'';

  async listar() {
    try {
      await this.crudViaje.listarViajesPasajero(this.idUsuario).subscribe(data => {
        this.viajes = data;
        this.viajes.forEach((element) => {
          this.crudChofer.getChofer(element.chofer).subscribe(data =>{
            element.nomChof = data.nombre + ' ' + data.apellido;
          })
        });

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
