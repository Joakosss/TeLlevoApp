import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-chofer',
  templateUrl: './qr-chofer.page.html',
  styleUrls: ['./qr-chofer.page.scss'],
})
export class QrChoferPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.valorQrTexto=JSON.stringify(this.valorQr)
  }

  valorQrTexto: string='QrChofer'

  valorQr={
    codigoViaje: '0001', codChofer:'022',
    lat:-6632, long:700.0
  }
}
