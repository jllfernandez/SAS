import { Generic } from './Generic';

export class NodoZona extends Generic {
  tipoZona: number;
  descTipoZona: string;
  descripcion: string;
  sons: NodoZona[];
  idZonaPadre: number;
  isSensor: number = 0;
  nivel: number;
}
