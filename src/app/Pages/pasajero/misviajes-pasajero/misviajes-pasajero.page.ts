import { Component, OnInit } from '@angular/core';
import { IonModal, MenuController, ModalController, NavController, Platform } from '@ionic/angular';
import { CrudChoferService } from 'src/app/servicio/chofer/crud-chofer.service';

import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';
 
import { Barcode, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-misviajes-pasajero',
  templateUrl: './misviajes-pasajero.page.html',
  styleUrls: ['./misviajes-pasajero.page.scss'],
})
export class MisviajesPasajeroPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  scanResult = '';
  viajes : any = [];
  cargandoFlag = false;
  idUsuario = localStorage.getItem('idUsuario')||'';
  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  constructor(private menu: MenuController,
              private navCtrl: NavController,
              private crudViaje: CrudViajeService,
              private crudChofer: CrudChoferService,
              private alertController: AlertController,
              private modal: ModalController,
              private platform: Platform
  ) { }

  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      // condición barcode scanner es soportado por dispositivo
      BarcodeScanner.isSupported().then();
      // Si lo soporta pide permisos para utilizar camara
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }

    this.menu.enable(true);
    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('misviajes-chofer')
    }

    this.cargandoFlag=true;
    this.listar().then(() => {
      setTimeout(() => this.cargandoFlag = false, 1000);
    });

    if (localStorage.getItem('perfil')==='chofer') {
      this.navCtrl.navigateRoot('qr-chofer')
    }
  }

  /* Función para abrir escaner QR */
  async startScan(){
    const modal = await this.modal.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: {
      formats: [],
      lensFacing: LensFacing.Back
    }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    // Si hay datos en la lectura muestra el valor
    if(data){
      this.scanResult = data?.barcode?.displayValue; 
    }

  }

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
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
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

  escaner(viaje: string) {
    this.startScan();
    if (this.scanResult === viaje) {
      Swal.fire({
        icon: 'success',
        title: 'Es tu viaje :)',
        text: 'Que tengas buen viaje!s',
        heightAuto: false
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: 'No es tu viaje :c',
        heightAuto: false
      });
    }
  }

  cancelarViaje(viaje: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Podrías perder tu cupo!",
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
        this.crudViaje.eliminarDelViaje(viaje, this.idUsuario).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Viaje Cancelado c:',
            text: 'Te vemos en otra ocasión',
            heightAuto: false
          });
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cancelar',
            text: 'Reinténtalo',
            heightAuto: false
          });
        });
      }
    });
  }
  

}
