import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisviajesPasajeroPageRoutingModule } from './misviajes-pasajero-routing.module';

import { MisviajesPasajeroPage } from './misviajes-pasajero.page';

import { ModuloModule } from 'src/app/componentes/modulo/modulo.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisviajesPasajeroPageRoutingModule,
    ModuloModule,
    MatProgressSpinnerModule
  ],
  declarations: [MisviajesPasajeroPage]
})
export class MisviajesPasajeroPageModule {}
