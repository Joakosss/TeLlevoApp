import { Pasajero } from "./Pasajero";

export interface Viaje {
    uid?: string;
    destino: string;
    chofer: string;
    pasajeros: string[] | null;
    hora_inicio: string | null;
    punto_encuentro: string;
    valor: number | null;
    numPasajeros: number;
    contadorPasajeros: number;
    finalizado: boolean;
    fecha: string; // Cambiar a string para almacenar la fecha formateada
    latitud: string | null;
    longitud: string | null;
}

export function viajeVacio(): Viaje {
    const today = new Date();
    const dia = String(today.getDate()).padStart(2, '0');
    const mes = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const año = String(today.getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año
    const fecha = `${dia}/${mes}/${año}`;
    
    return {
        uid: '',
        destino: '',
        chofer: '',
        pasajeros: null,
        hora_inicio: null,
        punto_encuentro: '',
        valor: null,
        numPasajeros: 0,
        contadorPasajeros: 0,
        finalizado: false,
        fecha: fecha,
        latitud: null,
        longitud: null
    };
}
