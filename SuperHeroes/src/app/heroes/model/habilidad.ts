import { Superheroe } from "./super-heroe";

export class Habilidad {
    
    id: number;
    nombre: string;
    descripcion: string;
    nivel: number;
    tipo: string;

    constructor(
        id: number,
        nombre: string,
        descripcion: string,
        nivel: number,
        tipo: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.nivel = nivel;
        this.tipo = tipo;
    }
}
