
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Viaje,viajeVacio } from 'src/app/model/Viaje';
import { CrudViajeService } from 'src/app/servicio/viaje/crud-viaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {
  viaje = viajeVacio();
  errDestino        : boolean | null = null;
  errMonto          : boolean | null = null;
  errPuntoEncuentro : boolean | null = null;
  errNumPasajeros   : boolean | null = null;
  errHoraInicio     : boolean | null = null;
  cargandoFlag      : boolean        = false;
  idChofer : string|null = localStorage.getItem('idUsuario')
  
  direccion: string = '';

  constructor(private crud:CrudViajeService,
              private navCtrl:NavController,
  ) { }

  ngOnInit() {
    const direccion_guardada = localStorage.getItem("nombre_direccion");
    if (direccion_guardada != null) {
      this.viaje.destino = direccion_guardada;
    }
  }
  valDestino()       { this.errDestino = this.viaje.destino !== '';}
  valMonto()         { this.errMonto = this.viaje.valor !== null;}
  valPuntoEncuentro(){ this.errPuntoEncuentro = this.viaje.punto_encuentro !== ''  ;}
  valNumPasajeros()  { this.errNumPasajeros = this.viaje.numPasajeros !== null;}
  valHoraInicio()    { this.errHoraInicio = this.viaje.hora_inicio !== null;}
  
  validador(){
    this.valDestino()       
    this.valMonto()         
    this.valPuntoEncuentro()
    this.valNumPasajeros()      
    this.valHoraInicio()    
    if (this.errDestino && this.errMonto && this.errPuntoEncuentro && this.errNumPasajeros && this.errHoraInicio) {
      this.grabar();
    } else {
      Swal.fire({
        icon:'error',
        title: 'Hubo un error!',
        text: 'Asegurate de responder todas las casillas ;C',
        confirmButtonText: 'Reintentar',
        heightAuto: false
      })
    }
  }

  grabar(){
    this.cargandoFlag = true;
    if (this.idChofer) {
      this.viaje.contadorPasajeros = this.viaje.numPasajeros;
      this.viaje.chofer = this.idChofer;
      this.crud.grabar(this.viaje).then(()=>{
      localStorage.removeItem("nombre_direccion");
        Swal.fire({
          icon:'success',
          title: 'Viaje creado con éxito!',
          text: 'Esperemos el viaje c:',
          confirmButtonText: 'Aceptar',
          heightAuto: false
        }).then(()=>this.navCtrl.navigateRoot('home-chofer'))
        
      }).catch((err)=>{
        Swal.fire({
          icon:'error',
          title: 'Hubo un error!',
          text: 'Error al crear tu viaje ;C',
          confirmButtonText: 'Reintentar',
          heightAuto: false
        })   
      })
    }
      /* cargando forzado para darle tiempo como si procesar es complicado */
    setTimeout(()=>this.cargandoFlag=false, 2000)

  }
}
