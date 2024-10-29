import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CrudChoferService } from 'src/app/servicio/chofer/crud-chofer.service';

import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';
 
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-misviajes-pasajero',
  templateUrl: './misviajes-pasajero.page.html',
  styleUrls: ['./misviajes-pasajero.page.scss'],
})
export class MisviajesPasajeroPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private menu: MenuController,
              private navCtrl: NavController,
              private crudViaje: CrudViajeService,
              private crudChofer: CrudChoferService,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('misviajes-chofer')
    }

    this.cargandoFlag=true;
    this.listar()
    setTimeout(()=>this.cargandoFlag=false,1000)

    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('qr-chofer')
    }

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
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

  async scan(): Promise<void> {
    alert("btn qr");
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    } 
    try {
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
    } catch (error) {
      console.error(error);
    }

  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  test() {
    alert("Test Alert!");
  }

}
