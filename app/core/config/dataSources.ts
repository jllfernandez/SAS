import { URL_ENDPOINT } from './config';
import { URL_ENUMERADOS } from './config';

// dataSources para los componentes jqx
export const categorias_source = {
  datatype: 'json',
  datafields: [
    { name: 'id', type: 'number' },
    { name: 'nombre', type: 'string' },
    { name: 'descripcion', type: 'string' }
  ],
  url: URL_ENDPOINT + '/categorias/',
  formatdata: function() {
    return '';
  }
};

export const empresas_source = {
  datatype: 'json',
  datafields: [{ name: 'id', type: 'number' }, { name: 'nombre', type: 'string' }],
  url: URL_ENDPOINT + '/empresas/?_sort=nombre',
  formatdata: function() {
    return '';
  }
};

export const perfiles_source = {
  datatype: 'json',
  datafields: [
    { name: 'id', type: 'number' },
    { name: 'descripcion', type: 'string' },
    { name: 'fechaAlta', type: 'any' },
    { name: 'fechaBaja', type: 'any' },
    { name: 'estado', type: 'number' },
    { name: 'nivel', type: 'number' },
    { name: 'codigo', type: 'boolean' },
    { name: 'dnie', type: 'boolean' },
    { name: 'biometria', type: 'boolean' },
    { name: 'idEmpresa', type: 'number' }
  ],
  url: URL_ENDPOINT + '/perfiles/?_sort=descripcion',
  formatdata: function() {
    return '';
  }
};

export const perfilesUsuarios_source = {
  datatype: 'json',
  datafields: [{ name: 'nombre', type: 'string' }],
  url: URL_ENDPOINT + '/perfilesUsuario/?_sort=nombre',
  formatdata: function() {
    return '';
  }
};

export const portadores_source: any = {
  localdata: null,
  datatype: 'json',
  datafields: [
    { name: 'tipoIdentificacion', type: 'string' },
    { name: 'sexo', type: 'string' },
    { name: 'codigoIdentificacion', type: 'string' },
    { name: 'nombre', type: 'string' },
    { name: 'apellido1', type: 'string' },
    { name: 'apellido2', type: 'string' },
    { name: 'idCategoria', type: 'number' },
    { name: 'nombreCategoria', type: 'string' },
    { name: 'tipoPortador', type: 'string' },
    { name: 'fechaNacimiento', type: 'Date' },
    { name: 'telefono', type: 'string' },
    { name: 'extension', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'tindautoriz', type: 'boolean' },
    { name: 'codigoExpediente', type: 'string' },
    { name: 'cnumser', type: 'string' },
    { name: 'foto', type: 'number' },
    { name: 'idFija', type: 'number' },
    { name: 'idTemporal', type: 'number' },
    { name: 'idPerfil', type: 'number' },
    { name: 'descPerfil', type: 'string' },
    { name: 'idPerfil2', type: 'number' },
    { name: 'descPerfil2', type: 'string' },
    { name: 'idPerfil3', type: 'number' },
    { name: 'descPerfil3', type: 'string' },
    { name: 'idPerfil4', type: 'number' },
    { name: 'descPerfil4', type: 'string' },
    { name: 'idPerfil5', type: 'number' },
    { name: 'descPerfil5', type: 'string' },
    { name: 'fechaBaja', type: 'Date' },
    { name: 'fechaAlta', type: 'Date' },
    { name: 'tipoEvento', type: 'number' },
    { name: 'idEmpresa', type: 'number' },
    { name: 'nombreEmpresa', type: 'string' },
    { name: 'pin', type: 'number' }
  ],
  root: 'portadores',
  record: '',
  id: 'id',
  url: URL_ENDPOINT + '/portadores/',
  formatdata: function() {
    return '';
  }
};

export const estados_eventos_source = {
  datatype: 'json',
  datafields: [{ name: 'id', type: 'number' }, { name: 'nombre', type: 'string' }],
  url: URL_ENUMERADOS + '/TESTSENSOR/valores',
  formatdata: function() {
    return '';
  }
};

export const analizador_eventos_source = {
  datatype: 'json',
  datafields: [{ name: 'idanaliza', type: 'number' }, { name: 'nombre', type: 'string' }],

  url: URL_ENDPOINT + '/analizadores/?_sort=nombre',
  formatdata: function() {
    return '';
  }
};
