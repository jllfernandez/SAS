import { Generic } from './Generic';

export class Evento extends Generic {
  idserver: number;
  nombre: string;
  pc: string;
  estadoserver: number;
  puerto: number;
  idanaliza: number;
  portconsolas: number;
  portadmin: number;
  porttesrvrev: number;
  portteanali: number;
  porttecontador: number;
}
