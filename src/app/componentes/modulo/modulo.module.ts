import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importar módulo de Ionic
import { IonicModule } from '@ionic/angular';
// Importar componentes creados:
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { ViajesComponent } from '../viajes/viajes.component';


// Declarar y exportar los componentes:
@NgModule({
  declarations: [
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],exports:[
    ToolbarComponent,
    MenuComponent,
    HeaderComponent,
    ViajesComponent
  ]
})
export class ModuloModule { }
