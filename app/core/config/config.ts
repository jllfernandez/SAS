export const URL_JSON_SERVER = 'http://localhost:3000';
export const URL_HOST = 'http://centos.shsconsultores.es:8080';
export const URL_CENTOS = URL_HOST + '/consultas/entidades';
export const URL_LOCALHOST = 'http://localhost:8080/consultas/entidades';
export const URL_ENDPOINT = URL_CENTOS;
export const URL_ENUMERADOS = URL_HOST + '/es/enumerados';

export enum Documento {
  'DNI' = 1,
  'NIF',
  'PASAPORTE',
  'Nº SERIE',
  'NIE'
}
export enum TipoPortador {
  'FIJO' = 1,
  'TEMPORAL',
  'MERCANCIA'
}
