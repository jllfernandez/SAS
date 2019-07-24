// Angular imports
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
// 3rd-party components
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import * as moment from 'moment';
// Personal imports
import { Portador } from '../../core/models/Portador';
import { PortadoresService } from '@app/core/services/portadores.service';
import { Documento, TipoPortador } from '@app/core/config/config';
import { categorias_source, empresas_source, portadores_source, perfiles_source } from '@app/core/config/dataSources';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

@Component({
  selector: 'app-busqueda-portadores',
  templateUrl: './busqueda-portadores.component.html',
  styleUrls: ['./busqueda-portadores.component.scss']
})
export class BusquedaPortadoresComponent implements OnInit {
  // Variables propias
  inputData: string;
  params: HttpParams;
  portador: Portador;
  empresas: Array<any> = [];
  modoLocalizacion: any;

  // Campos filtrado localizacion
  @ViewChild('localizacionForm') b_localizacion: NgForm;
  @ViewChild('radio_identificacion') r_identificacion: ElementRef;
  @ViewChild('select_identidad') s_identidad: jqxComboBoxComponent;
  @ViewChild('identidad') i_identidad: ElementRef;
  @ViewChild('radio_personal') r_personal: ElementRef;
  @ViewChild('apellido1') i_apellido1: ElementRef;
  @ViewChild('apellido2') i_apellido2: ElementRef;
  @ViewChild('nombre') i_nombre: ElementRef;
  @ViewChild('radio_expediente') r_expediente: ElementRef;
  @ViewChild('expediente') i_expediente: ElementRef;

  // Campos filtrado filtros
  @ViewChild('filtradoForm') b_filtrado: NgForm;
  @ViewChild('select_tipo') s_tipo: jqxComboBoxComponent;
  @ViewChild('select_categoria') s_categoria: jqxComboBoxComponent;
  @ViewChild('filtro_identificador') f_identificador: ElementRef;
  @ViewChild('filtro_perfil') f_perfil: jqxComboBoxComponent;
  @ViewChild('filtro_zona') f_zona: ElementRef;
  @ViewChild('filtro_empresa') f_empresa: jqxComboBoxComponent;

  // jqx Grid
  @ViewChild('busquedaPortadores') g_portadores: jqxGridComponent;
  url_rest_original: any;
  porta_dataAdapter: any;
  columns: any[];
  columngroups?: any[];
  filtergroup: any;
  localizationObject: any;

  // jqx ComboBox
  documentos_source: Array<string>;
  tipoPortadores_source: Array<string>;

  categorias_dataAdapter: any;
  empresas_dataAdapter: any;
  perfiles_dataAdapter: any;

  constructor(
    private portadores_service: PortadoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.params = new HttpParams();
    this.portador = new Portador();
    this.empresas = new Array();

    // jqx Grid
    this.localizationObject = jqxGrid_ES;

    this.porta_dataAdapter = new jqx.dataAdapter(portadores_source);
    this.url_rest_original = portadores_source.url;
    this.columns = [
      { text: 'Baja', datafield: 'fechaBaja', width: 50, cellsrenderer: this.cellsrenderer },
      { text: 'Foto', datafield: 'foto', width: 50, cellsrenderer: this.cellsrenderer },
      { text: 'Documento', datafield: 'tipoIdentificacion', width: 95 },
      { text: 'Código', datafield: 'codigoIdentificacion', width: 90 },
      { text: 'Primer Apellido', datafield: 'apellido1', width: 150 },
      { text: 'Segundo Apellido', datafield: 'apellido2', width: 150 },
      { text: 'Nombre', datafield: 'nombre', width: 150 },
      { text: 'Tipo', datafield: 'tipoPortador' },
      { text: 'Categoria', datafield: 'nombreCategoria' },
      { text: 'Teléfono', datafield: 'telefono', width: 90 },
      { text: 'Perfil', datafield: 'descPerfil' },
      { text: 'Última E/S', datafield: '' },
      { text: 'Empresa', datafield: 'nombreEmpresa' }
    ];

    // jqx ComboBox
    this.documentos_source = [];
    for (const key in Documento) {
      if (typeof Documento[key] === 'string') {
        this.documentos_source.push(Documento[key]);
      }
    }

    this.tipoPortadores_source = [];
    for (const key in TipoPortador) {
      if (typeof TipoPortador[key] === 'string') {
        this.tipoPortadores_source.push(TipoPortador[key]);
      }
    }

    this.categorias_dataAdapter = new jqx.dataAdapter(categorias_source);
    this.empresas_dataAdapter = new jqx.dataAdapter(empresas_source);
    this.perfiles_dataAdapter = new jqx.dataAdapter(perfiles_source);
  }

  ngOnInit() {}

  checkAutorizador(checked: any) {
    if (checked) {
      this.portador.tindautoriz = 1;
    } else {
      this.portador.tindautoriz = 0;
    }
  }

  checkBaja(checked: any) {
    if (checked) {
      const today = moment(moment.now()).format('DD/MM/YYYY');
      this.portador.fechaBaja = today.toString();
    } else {
      this.portador.fechaBaja = null;
    }
  }

  selectDocumento(event: any) {
    this.r_identificacion.nativeElement.checked = true;
    const tipoDoc = this.s_identidad.getSelectedItem().value;
    const tipoDocIndex = this.s_identidad.getSelectedIndex() + 1;

    this.portador.tipoIdentificacion = tipoDocIndex;
  }

  selectRadio(event: any) {
    const elementClicked = event.target;
    const idClicked = elementClicked.id;
    this.modoLocalizacion = idClicked;
    this.limpiarLocalizacion(idClicked);
  }

  selectTipoPortador(event: any) {
    const tipoPortador = this.s_tipo.getSelectedItem().value;
    const tipoPortadorIndex = this.s_tipo.getSelectedIndex() + 1;

    if (tipoPortador === 'FIJO') {
      this.s_categoria.disabled(false);
    } else {
      this.s_categoria.disabled(true);
    }

    this.portador.tipoPortador = tipoPortadorIndex;
  }

  selectCategoria(event: any) {
    const categoria = this.s_categoria.getSelectedItem().value;

    this.portador.idCategoria = categoria;
  }

  entraCampoTexto(elementId: any) {
    switch (elementId) {
      case 'codigoIdentificacion':
        this.r_identificacion.nativeElement.checked = true;
        break;
      case 'apellido1':
      case 'apellido2':
      case 'nombre':
        this.r_personal.nativeElement.checked = true;
        break;
      case 'codigoExpediente':
        this.r_expediente.nativeElement.checked = true;
        break;
    }
  }

  recogeCampoTexto(event: any) {
    console.log(event);
    const idInput = event.target.id;
    const valueInput = event.target.value;

    if (valueInput !== '') {
      this.portador[idInput] = valueInput;
    }
    console.log(this.portador[idInput]);
  }

  busquedaFiltrada() {
    for (const key in this.portador) {
      if (this.portador.hasOwnProperty(key)) {
        if (key === 'fechaBaja') {
          this.params = this.params.set(`${key}_lte`, this.portador[key]);
          this.params = this.params.set(`${key}_neq`, null);
        } else {
          if (typeof this.portador[key] === 'string') {
            this.portador[key] = this.portador[key].toUpperCase();
            this.params = this.params.set(`${key}_like`, this.portador[key]);
          } else {
            this.params = this.params.set(key, this.portador[key]);
          }
        }
      }
    }

    this.portadores_service.getPortadoresByParams(this.params).subscribe(success => {
      portadores_source.url = null;
      portadores_source.localdata = success;
      this.porta_dataAdapter = portadores_source;
      this.g_portadores.updatebounddata('cells');
    });
  }

  imprimeGrid() {
    const gridContent = this.g_portadores.exportdata('html');
    const newWindow = window.open('', '', 'width=794, height=1123'),
      document = newWindow.document.open(),
      pageContent =
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '<meta charset="utf-8" />\n' +
        '</head>\n' +
        '<body>\n' +
        '<h2 style="text-align:center;">Listado de portadores</h2>\n' +
        '<hr />\n' +
        gridContent +
        '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
  }

  limpiarLocalizacion(elem: string) {
    if (elem === 'identificacion') {
      this.i_apellido1.nativeElement.value = '';
      this.i_apellido2.nativeElement.value = '';
      this.i_nombre.nativeElement.value = '';
      this.i_expediente.nativeElement.value = '';
    }
    if (elem === 'personal') {
      this.i_identidad.nativeElement.value = '';
      this.i_expediente.nativeElement.value = '';
    }
    if (elem === 'expediente') {
      this.i_identidad.nativeElement.value = '';
      this.i_apellido1.nativeElement.value = '';
      this.i_apellido2.nativeElement.value = '';
      this.i_nombre.nativeElement.value = '';
    }
  }

  limpiarFiltros(elementId: any) {
    const idClicked = elementId.substr(elementId.indexOf('-') + 1);

    switch (idClicked) {
      case 'identificador':
        this.f_identificador.nativeElement.value = '';
        break;
      case 'perfil':
        this.f_perfil.clearSelection();
        break;
      case 'zona':
        this.f_zona.nativeElement.value = '';
        break;
      case 'empresa':
        this.f_empresa.clearSelection();
        break;
      default:
        this.s_identidad.clearSelection();
        this.s_tipo.clearSelection();
        this.s_categoria.clearSelection();
        this.f_perfil.clearSelection();
        this.f_empresa.clearSelection();
        break;
    }
  }

  limpiarTodo() {
    (<HTMLFormElement>document.getElementById('localizacion')).reset();
    (<HTMLFormElement>document.getElementById('filtrado')).reset();
    this.limpiarFiltros('erase-all');
    this.portador = new Portador();
    this.params = new HttpParams();
    portadores_source.url = this.url_rest_original;
    portadores_source.localdata = null;
    this.porta_dataAdapter = portadores_source;
    this.g_portadores.updatebounddata('cells');
  }

  abreAltaPortador() {
    this.router.navigate(['/portadores']);
  }

  abreDetallePortador(rowdata: any) {
    console.log(rowdata);
    this.router.navigate(['/portadores', rowdata.uid]);
  }

  // Metodo de jqx-Grid para el renderizado de columnas
  cellsrenderer = (
    row: number,
    columnfield: string,
    value: any,
    defaulthtml: string,
    columnproperties: any,
    rowdata: any
  ): string => {
    if (columnfield === 'fechaBaja') {
      if (value !== '30/12/1899') {
        const bajaArr = value.split('/');
        bajaArr.reverse();
        const formatDate = Date.parse(bajaArr);
        const now = Date.now();

        // console.log(row, columnfield, value, defaulthtml, columnproperties, rowdata);

        if (formatDate <= now) {
          return `<span class="text-icon">X</span>`;
        }
      } else {
        value = '';
        return value;
      }
    }
    if (columnfield === 'foto' && value === 1) {
      return `<span class="imagen"><i class="fas fa-camera"></i></span>`;
    }
    if (columnfield === 'tipoIdentificacion') {
      value = Documento[value];
      return `<span class="text">${value}</span>`;
    }
    if (columnfield === 'tipoPortador') {
      value = TipoPortador[value];
      return `<span class="text">${value}</span>`;
    }
  };
}
