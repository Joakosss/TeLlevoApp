import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importar módulo de Ionic
import { IonicModule } from '@ionic/angular';
// Importar componentes creados:
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { ViajesComponent } from '../viajes/viajes.component';
import { CrearViajeComponent } from '../crear-viaje/crear-viaje.component';
import { FormsModule } from '@angular/forms';
import { CrearQrComponent } from '../crear-qr/crear-qr.component';
import { QrCodeModule } from 'ng-qrcode';
import { MapaComponent } from '../mapa/mapa.component';

// Declarar y exportar los componentes:
@NgModule({
  declarations: [
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent,
    CrearViajeComponent,
    CrearQrComponent,
    MapaComponent,
  ],
  imports: [
    QrCodeModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ],exports:[
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent,
    CrearViajeComponent,
    CrearQrComponent,
    MapaComponent,
  ]
})
export class ModuloModule { }
