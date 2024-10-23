import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//Importaciones para el mapa 
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Feature, ServicioMapboxService } from 'src/app/servicio/mapa/servicio-mapbox.service';
import { HttpClient } from '@angular/common/http';
import { Direccion } from 'src/app/model/Direccion';

@Component({
  selector: 'app-home-chofer',
  templateUrl: './home-chofer.page.html',
  styleUrls: ['./home-chofer.page.scss'],
})
export class HomeChoferPage implements OnInit {
  map:mapboxgl.Map;
  direccion: string = '';
  direcciones: Direccion[] = [];
  dire_seleccion = '';
  lat_seleccion: number | null = null;
  lng_seleccion: number | null = null;
  dire_valida: boolean = false;
  marcadorActual:mapboxgl.Marker | null = null;
  ruta='https://api.mapbox.com/geocoding/v5/mapbox.places/XXXXX.json?access_token=pk.eyJ1IjoianVha28xMDUiLCJhIjoiY20yY3F4MzFuMGxjZjJpbzh1MmtwN3RkeSJ9.eq0Klw01jvADGQMMR8THBw'
  geometria='https://api.mapbox.com/directions/v5/mapbox/driving/-70.57881856510504,-33.59844199173414;LNG,LAT?geometries=geojson&access_token=pk.eyJ1IjoianVha28xMDUiLCJhIjoiY20yY3F4MzFuMGxjZjJpbzh1MmtwN3RkeSJ9.eq0Klw01jvADGQMMR8THBw'

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private mapboxServicio: ServicioMapboxService,
    private http: HttpClient,
  ) { }

  ngOnInit():void {}

  ionViewWillEnter(){
    if (localStorage.getItem('perfil')==='pasajero') {
      this.navCtrl.navigateRoot('home-pasajero')
    }
    this.mapa() 
  }

  navPagina(page: string){
    this.router.navigate([page]).then(()=>{
      location.reload();
    })
  }

  validarDireccion(): boolean {
    if (this.dire_seleccion != '' && this.lat_seleccion != null && this.lng_seleccion != null ){
      this.dire_valida = true;
    } else
      this.dire_valida;
    return this.dire_valida
  }

  // Redirecciona a pagina crear viaje 
  crearViaje() {
    if (this.validarDireccion()) {
      localStorage.setItem("nombre_direccion", this.dire_seleccion);
      this.navPagina('/crear-viaje/');
    } else {
      alert('Debe seleccionar una dirección válida antes de crear el viaje.');
    }
  }

  busqueda(event: any){
    const busqueda = event.target.value.toLowerCase();
    console.log('Valor ingresado en el searchbar:', busqueda); 
    
    if (busqueda && busqueda.length > 0){
      this.mapboxServicio
        .buscarDireccion(busqueda)
        .subscribe((features: Feature[])=>{
          this.direcciones = features.map(item => ({
            nombre: item.place_name,
            lng: item.center[0],
            lat: item.center[1]
          }));
            
          console.log('Resultados de la búsqueda:', this.direcciones);
        });
    } else {
      this.direcciones = [];
    }
  }

  seleccionar(direccion: Direccion){
    console.log('Dirección seleccionada:', direccion);
    this.dire_seleccion = direccion.nombre;
    this.lat_seleccion = direccion.lat;
    this.lng_seleccion = direccion.lng;
    this.direcciones = [];

    const ev = {
      detail:{
        value: {
          lat: direccion.lat,
          lng: direccion.lng
        }
      }
    };

    this.direccion_seleccionada(ev);
  }

  direccion_seleccionada(ev){
    const lat = ev.detail.value["lat"];
    const lng = ev.detail.value["lng"];

    // Nueva url de ruta 
    let nueva_ruta = this.geometria.replaceAll('LNG', lng).replaceAll('LAT', lat);
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

  borrarDireccion(){
    this.direcciones = []
    this.mapa()
    this.eliminarMarcador()
  }

  eliminarMarcador() {
    if (this.marcadorActual) {
      this.marcadorActual.remove();
      this.marcadorActual = null;
    }
  }

  eliminarRuta() {
    if (this.map.getLayer('route')) {
      this.map.removeLayer('route');
    }
    if (this.map.getSource('route')) {
      this.map.removeSource('route');
    }
  }

  mapa(){
    this.map = new mapboxgl.Map({

      accessToken: environment.MAPBOX_ACCESS_TOKEN,
      container: 'mapa-box',
      style: 'mapbox://styles/mapbox/streets-v12',
      center:[ -70.57879639711527,-33.59850407643264],
      zoom:16,
      collectResourceTiming: false,
    });
    new mapboxgl.Marker({color:'#FFB800'}).setLngLat([-70.57880159991507,-33.59846466294888]).addTo(this.map)
  }

  generar_ruta(){
    this.http.get(this.geometria).subscribe((data:any)=>{
      console.log(data.routes[0].geometry);

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


}

