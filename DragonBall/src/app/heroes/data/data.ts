import { Habilidad } from "../model/habilidad";

export const listaDeHabilidades: Habilidad[] = [
  new Habilidad(1, 'Super fuerza', 'Capacidad para levantar objetos pesados con facilidad.', 5, 'Física'),
  new Habilidad(2, 'Telequinesis', 'Manipulación y control de objetos con la mente.', 4, 'Mental'),
  new Habilidad(3, 'Invisibilidad', 'Habilidad para volverse invisible a voluntad.', 3, 'Mística'),
  new Habilidad(4, 'Vuelo', 'Habilidad de volar sin necesidad de medios externos.', 4, 'Física'),
  new Habilidad(5, 'Control del fuego', 'Capacidad para generar y controlar el fuego.', 3, 'Elemental'),
  new Habilidad(6, 'Regeneración', 'Capacidad para curar heridas y regenerar tejidos rápidamente.', 4, 'Física'),
  new Habilidad(7, 'Telepatía', 'Habilidad de comunicarse mentalmente con otros.', 4, 'Mental'),
  new Habilidad(8, 'Transformación', 'Capacidad de cambiar de forma o aspecto físico.', 3, 'Mística'),
  new Habilidad(9, 'Manipulación del tiempo', 'Control sobre el flujo del tiempo.', 5, 'Mística'),
  new Habilidad(10, 'Inmunidad al veneno', 'Resistencia o inmunidad a sustancias venenosas.', 2, 'Física')
];

export const listaDePoderes: string[] = [
  'Super fuerza',
  'Telequinesis',
  'Invisibilidad',
  'Vuelo',
  'Control del fuego',
  'Regeneración',
  'Telepatía',
  'Transformación',
  'Manipulación del tiempo',
  'Inmunidad al veneno'
];
