import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeChoferPageRoutingModule } from './home-chofer-routing.module';

import { HomeChoferPage } from './home-chofer.page';

import { ModuloModule } from 'src/app/componentes/modulo/modulo.module';
import { CrearViajeComponent } from 'src/app/componentes/crear-viaje/crear-viaje.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeChoferPageRoutingModule,
    ModuloModule,
  ],
  declarations: [HomeChoferPage]
})
export class HomeChoferPageModule {}
