import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Feature, ServicioMapboxService } from 'src/app/servicio/mapa/servicio-mapbox.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {

  constructor(private mapboxServicio: ServicioMapboxService,
              private http: HttpClient,
              private modals : ModalController ) { }

  ngOnInit():void {}

  ionViewWillEnter(){
    this.mapa() 
  }
  
  @Input() latitud = '';
  @Input() longitud = '';

  map:mapboxgl.Map;
  marcadorActual:mapboxgl.Marker | null = null;
  ruta='https://api.mapbox.com/geocoding/v5/mapbox.places/XXXXX.json?access_token=pk.eyJ1IjoianVha28xMDUiLCJhIjoiY20yY3F4MzFuMGxjZjJpbzh1MmtwN3RkeSJ9.eq0Klw01jvADGQMMR8THBw'
  geometria='https://api.mapbox.com/directions/v5/mapbox/driving/-70.57881856510504,-33.59844199173414;LNG,LAT?geometries=geojson&access_token=pk.eyJ1IjoianVha28xMDUiLCJhIjoiY20yY3F4MzFuMGxjZjJpbzh1MmtwN3RkeSJ9.eq0Klw01jvADGQMMR8THBw'

  mapa(){
    this.map = new mapboxgl.Map({

      accessToken: environment.MAPBOX_ACCESS_TOKEN,
      container: 'mapa-box',
      style: 'mapbox://styles/mapbox/streets-v12',
      center:[ -70.57879639711527,-33.59850407643264],
      zoom:16,
      collectResourceTiming: false,
    });

    this.map.on('load', () => {
      new mapboxgl.Marker({ color: '#FFB800' })
        .setLngLat([-70.57880159991507, -33.59846466294888])
        .addTo(this.map);

      // Llamar a direccion_seleccionada después de que el mapa haya cargado
      this.direccion_seleccionada();
    });
  }

  direccion_seleccionada(){
    const lat = parseInt(this.latitud);
    const lng = parseInt(this.longitud);

    // Nueva url de ruta 
    let nueva_ruta = this.geometria.replaceAll('LNG', this.longitud).replaceAll('LAT', this.latitud);
    this.geometria = nueva_ruta;

    console.log('url nueva ruta: ', this.geometria);

    // Se agrega el marcador
    this.marcador(lng, lat);
    // Nueva ruta
    this.generar_ruta()
  }

  marcador(lng:number,lat:number){
    this.marcadorActual = new mapboxgl.Marker({color:'#217cfc'})
    .setLngLat([lng,lat]).addTo(this.map);
  }

  generar_ruta(){
    this.http.get(this.geometria).subscribe((data:any)=>{
      
      this.map.addSource('route',{
        type:'geojson',
        data:{
          type:'Feature',
          geometry:data.routes[0].geometry,
          properties:{}
        }
      });

      this.map.addLayer({
        id:'route',
        type:'line',
        source:'route',
        layout:{
          "line-cap":'round',
          "line-join":'round'
        },
        paint:{
          "line-color":'#217cfc',
          "line-width":3
        }
      })
    })
  }

  cerrar(){
    this.modals.dismiss();
  }
}
