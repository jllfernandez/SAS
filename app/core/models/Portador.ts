import { Generic } from './Generic';
export class Portador extends Generic {
  tipoIdentificacion: any;
  sexo: any;
  codigoIdentificacion: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  idCategoria: number;
  nombreCategoria: string;
  tipoPortador: any;
  fechaNacimiento: string;
  telefono: string;
  extension: string;
  email: string;
  tindautoriz: number;
  codigoExpediente: string;
  cnumser: string;
  foto: number;
  idFija: number;
  idTemporal: number;
  idPerfil: Array<number>;
  descPerfil: Array<string>;
  fechaBaja: string;
  fechaAlta: string;
  tipoEvento: number;
  idEmpresa: number;
  nombreEmpresa: string;
  pin: number;
}
