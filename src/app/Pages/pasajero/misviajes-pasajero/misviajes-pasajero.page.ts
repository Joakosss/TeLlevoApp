import { Component, NgZone, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CrudChoferService } from 'src/app/servicio/chofer/crud-chofer.service';

import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';
 
import { Barcode, BarcodeFormat, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './misviajes-pasajero.component';
import { DialogService } from 'src/app/servicio/dialog/dialog.service';
import { AlertController } from '@ionic/angular';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-misviajes-pasajero',
  templateUrl: './misviajes-pasajero.page.html',
  styleUrls: ['./misviajes-pasajero.page.scss'],
})
export class MisviajesPasajeroPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;
  public isPermissionGranted = false;

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
              private readonly dialogService: DialogService,
              private readonly ngZone: NgZone
  ) { }

  ngOnInit():void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
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
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        },
      );
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

  public async startScan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.barcodes = [barcode];
      }
    });
  }  

  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
  }

  public async openSettings(): Promise<void> {
    await BarcodeScanner.openSettings();
  }

  public async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

/*   async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
 */

  
}
