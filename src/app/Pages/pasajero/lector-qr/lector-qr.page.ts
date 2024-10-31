import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService } from 'src/app/servicio/dialog/dialog.service';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from 'src/app/componentes/escaner-qr/barcode-scanning-modal.component';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });
  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  private readonly GH_URL =
    'https://github.com/capawesome-team/capacitor-barcode-scanning';

  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone,
  ) {}

  public ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
      // Si los permisos no están otorgados, solicita permisos.
      if (!this.isPermissionGranted) {
        this.requestPermissions();
      }
    });
  
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener('googleBarcodeScannerModuleInstallProgress', (event) => {
        this.ngZone.run(() => {
          const { state, progress } = event;
          this.formGroup.patchValue({
            googleBarcodeScannerModuleInstallState: state,
            googleBarcodeScannerModuleInstallProgress: progress,
          });
        });
      });
    });
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

  public async readBarcodeFromImage(): Promise<void> {
/*     const { files } = await FilePicker.pickImages({ limit: 1 });
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats,
    });
    this.barcodes = barcodes; */
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

  public openOnGithub(): void {
    window.open(this.GH_URL, '_blank');
  }

}
