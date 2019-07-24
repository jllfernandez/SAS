import { Generic } from './Generic';

export class NodoPerfil extends Generic {
  descripcion: string;
  fechaAlta: string;
  fechaBaja: string;
  estado: number;
  nivel: number;
  codigo: string;
  dnie: string;
  biometrica: string;
  idEmpresa: number;
  sons: NodoPerfil[];
  idPerfilPadre: number;
}
