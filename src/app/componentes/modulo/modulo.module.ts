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


// Declarar y exportar los componentes:
@NgModule({
  declarations: [
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent,
    CrearViajeComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],exports:[
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent,
    CrearViajeComponent,
  ]
})
export class ModuloModule { }
