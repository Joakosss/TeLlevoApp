import { Injectable } from '@angular/core';
// Importar para el mapa 
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  center: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicioMapboxService {

  constructor(private http: HttpClient) { }

  buscarDireccion(query: string){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=address&access_token='
    + environment.MAPBOX_ACCESS_TOKEN)
    .pipe(map((res: any) => {
      return res.features;
    }));
  }
}
