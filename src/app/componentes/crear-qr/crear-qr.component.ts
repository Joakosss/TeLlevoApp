import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crear-qr',
  templateUrl: './crear-qr.component.html',
  styleUrls: ['./crear-qr.component.scss'],
})
export class CrearQrComponent  implements OnInit {

  constructor(private modal : ModalController ) {}

  @Input() idViaje : string = '';  
  valorQrTexto: string;
  ngOnInit() {
    this.valorQrTexto=this.idViaje;
  }

  cerrar(){
    this.modal.dismiss();
  }

}
