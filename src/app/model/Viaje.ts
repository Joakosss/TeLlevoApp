import { Pasajero } from "./Pasajero";

export interface Viaje {
    uid?: string;
    destino: string;
    chofer: string;
    pasajeros: string[] | null;
    hora_inicio: string   | null;
    punto_encuentro: string;
    valor: number | null;
    numPasajeros: number | null;
    contadorPasajeros: number | null;
    finalizado:boolean;

    latitud: number | null;
    longitud: number | null;
} 

export function viajeVacio(): Viaje {
    return {    
        uid: '',
        destino: '',
        chofer: '',
        pasajeros: null,
        hora_inicio: null,
        punto_encuentro: '',
        valor: null ,
        numPasajeros: null,
        contadorPasajeros: null,
        finalizado:false,
        latitud: null,
        longitud: null
    };
}; 
