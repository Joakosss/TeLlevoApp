import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorQrPageRoutingModule } from './lector-qr-routing.module';

import { LectorQrPage } from './lector-qr.page';

import { ModuloModule } from 'src/app/componentes/modulo/modulo.module';
import { SharedTestingModule } from 'src/tests/modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorQrPageRoutingModule,
    ModuloModule,
    SharedTestingModule
  ],
  declarations: [LectorQrPage]
})
export class LectorQrPageModule {}
