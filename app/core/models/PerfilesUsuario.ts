import { Generic } from './Generic';
export class PerfilesUsuario extends Generic {
  nombre: string;
  descripcion: string;
  nivelPermisos: number;
  permisos: string[];
}
