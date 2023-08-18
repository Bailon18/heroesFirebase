import { Habilidad } from "./habilidad";

export class Superheroe {

    id: number;
    nombre: string;
    alias: string;
    poderes: string;
    descripcion: string;
    habilidad?: Habilidad;

    constructor(
        id: number,
        nombre: string,
        alias: string,
        poderes: string,
        descripcion: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.alias = alias;
        this.poderes = poderes;
        this.descripcion = descripcion;
    }
}
