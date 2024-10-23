import { Component, Input, input, OnInit, output } from '@angular/core';
import {CrudViajeService} from 'src/app/servicio/viaje/crud-viaje.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent  implements OnInit {

  @Input() destino:string = '';
  @Input() hora:string = '';
  @Input() fecha:string = '';
  @Input() monto:string = '';
  @Input() chofer:string = '';
  @Input() idViaje:string = '';
  @Input() idUsuario:string|null= '';
  
  constructor(private crudViaje:CrudViajeService) { }

  ngOnInit() {}

  async soliViaje(){
    try {
      const aux = await this.crudViaje.agregarAlViaje(this.idViaje,this.idUsuario||'')
      Swal.fire({
        icon: 'success',
        title: 'Viaje solicitado con éxito!',
        text: 'Esperamos sea un gran viaje c:',
        heightAuto: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error!',
        text: 'Reintenta solicitar el viaje',
        confirmButtonText: 'Reintentar',
        heightAuto: false,
      });
    }
  }

}
