import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { URL_CENTOS } from '@app/core/config/config';
import { empresas_source, perfilesUsuarios_source } from '../../core/config/dataSources';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';
import { testsensor_source, tasoc_source, tsensor_source } from '../../core/config/enumeradosSources';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit {
  @ViewChild('myGrid') Grid: jqxGridComponent;

  @ViewChild('ComboEmpresa') ComboEmpresa: jqxComboBoxComponent;
  @ViewChild('ComboEstado') ComboEstado: jqxComboBoxComponent;
  @ViewChild('ComboAsociacion') ComboAsociacion: jqxComboBoxComponent;
  @ViewChild('ComboTipoSensor') ComboTipoSensor: jqxComboBoxComponent;

  @ViewChild('NumSerie') NumSerie: ElementRef;

  filtros = '';

  // GRID
  localizationObject: any;

  tsensor_dataAdapter: any = new jqx.dataAdapter(tsensor_source);
  testsensor_dataAdapter: any = new jqx.dataAdapter(testsensor_source);
  tasoc_dataAdapter: any = new jqx.dataAdapter(tasoc_source);

  empresas_dataAdapter = new jqx.dataAdapter(empresas_source);

  filtro: FormGroup;

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNuevo = '';
  botonEliminar = '';
  botonModificar = '';

  modo = 'seleccion'; // posibles: seleccion, edicion, insercion

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'id', type: 'number' },
      { name: 'tsensor', type: 'string' },
      { name: 'testsensor', type: 'string' },
      { name: 'cnumser', type: 'string' },
      { name: 'alias', type: 'string' },

      { name: 'taparsist', type: 'string' },
      { name: 'tasoc', type: 'string' },
      { name: 'idmontaj', type: 'number' },
      { name: 'idcamaraip', type: 'number' },
      { name: 'tinterv', type: 'number' },

      { name: 'idmaestro', type: 'number' },
      { name: 'idexterno', type: 'number' },
      { name: 'idinterno', type: 'number' },
      { name: 'cmarca', type: 'number' },
      { name: 'cmodelo', type: 'number' },
      { name: 'tconexion', type: 'string' },

      { name: 'direcip', type: 'string' },
      { name: 'mascred', type: 'string' },
      { name: 'cuserid', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'cadconexion', type: 'string' },
      { name: 'vpuerto', type: 'number' },
      { name: 'vveloc', type: 'number' },

      { name: 'vparidad', type: 'string' },
      { name: 'vbitdatos', type: 'boolean' },
      { name: 'vbitstop', type: 'number' },
      { name: 'idserver', type: 'number' },
      { name: 'idserveriris', type: 'number' },
      { name: 'numzonas', type: 'boolean' },

      { name: 'nombrepc', type: 'string' },
      { name: 'puertotcp', type: 'number' },
      { name: 'tindhco', type: 'boolean' },
      { name: 'fpashco', type: 'string' },
      { name: 'vretardo', type: 'number' },
      { name: 'ce', type: 'boolean' },

      { name: 'controlaedificio', type: 'boolean' },
      { name: 'abrepuerta', type: 'boolean' },
      { name: 'tevento', type: 'boolean' },
      { name: 'idempresa', type: 'number' }
    ],

    id: 'id',
    url: URL_CENTOS + '/sensores/' + this.filtros,
    formatdata: function() {
      return '';
    }
  };

  iconRenderer = (
    row: any,
    datafield: any,
    value: any,
    defaultcellsrenderer: any,
    columnProperties: any,
    rowData: any
  ): string => {
    let valor = rowData.testsensor;
    let imgUrl = './../../assets/icons/color/16x/Sensor desconectado 88_16px.png';
    if (valor === 'DESCONECTADO') {
      imgUrl = './../../assets/icons/color/16x/Sensor desconectado 88_16px.png';
    }
    if (valor === 'CONECTADO') {
      imgUrl = './../../assets/icons/color/16x/Sensor conectado 87_16px.png';
    }
    if (valor === 'ACTIVADO') {
      imgUrl = './../../assets/icons/bicolor/16x/Off 71_16px.png';
    }
    if (valor === 'DESACTIVADO') {
      imgUrl = './../../assets/icons/color/16x/Off 71_16px.png';
    }
    let img = '<div><img style="text-align: center;padding-left:4px;padding-top:4px" src="' + imgUrl + '"></div>';
    return img;
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: '', datafield: '', width: '2%', cellsrenderer: this.iconRenderer },
    { text: 'Num. Serie', datafield: 'cnumser', width: '15%' },
    { text: 'Alias', datafield: 'alias', width: '33%' },
    { text: 'Tipo de sensor', datafield: 'tsensor', width: '25%' },
    { text: 'Tipo Asociacion', datafield: 'tasoc', width: '13%' },
    { text: 'Estado', datafield: 'testsensor', width: '12%' }
  ];

  constructor(private renderer: Renderer2, private fb: FormBuilder) {}

  ngOnInit() {
    this.filtro = this.fb.group({
      id: new FormControl(''),
      tipoSensor: new FormControl('', []),
      tipoAsociacion: new FormControl('', []),
      estado: new FormControl('', []),
      numSerie: new FormControl('', []),
      idEmpresa: new FormControl('')
    });

    this.localizationObject = jqxGrid_ES;
  }

  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);
    try {
      console.log(data[0]);
      if (data) {
        this.filtro.get('id').setValue(data[0].id);
        this.filtro.get('numSerie').setValue(data[0].cnumser);
        this.ComboEstado.selectItem(data[0].testsensor);
        this.ComboEmpresa.selectItem(data[0].idempresa);
        this.ComboAsociacion.selectItem(data[0].tasoc);
        this.ComboTipoSensor.selectItem(data[0].tsensor);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  controlGrid(modo: string) {
    if (modo === 'seleccion') {
      this.Grid.disabled(false);
    } else {
      this.Grid.disabled(true);
    }
  }

  actualizaGrid() {
    this.Grid.updatebounddata('cells');
  }

  controlBotones(estado: boolean) {
    if (estado) {
      this.disabled = '';
    } else {
      this.disabled = 'disabled';
    }
  }

  controlBotonesPrincipales(modo: string) {
    if (modo === 'edicion' || modo === 'insercion') {
      this.botonEliminar = 'disabled';
      this.botonModificar = 'disabled';
      this.botonNuevo = 'disabled';
    } else {
      this.botonEliminar = '';
      this.botonModificar = '';
      this.botonNuevo = '';
    }
  }

  accionAceptar() {}

  accionCancelar() {}

  nuevoSensor() {}

  editarSensor() {}

  filtrarSeleccion() {
    let filtros = '?';
    let primero = 0;
    if (this.filtro.get('tipoSensor').value) {
      if (!primero) {
        filtros = filtros + 'tsensor=' + this.filtro.get('tipoSensor').value;
        primero = 1;
      }
    }

    if (this.filtro.get('tipoAsociacion').value) {
      if (!primero) {
        filtros = filtros + 'tasoc=' + this.filtro.get('tipoAsociacion').value;
        primero = 1;
      } else {
        filtros = filtros + '&tasoc_eq=' + this.filtro.get('tipoAsociacion').value;
      }
    }

    if (this.filtro.get('estado').value) {
      if (!primero) {
        filtros = filtros + 'testsensor=' + this.filtro.get('estado').value;
        primero = 1;
      } else {
        filtros = filtros + '&testsensor_eq=' + this.filtro.get('estado').value;
      }
    }

    if (this.filtro.get('numSerie').value) {
      if (!primero) {
        filtros = filtros + 'cnumser=' + this.filtro.get('numSerie').value;
        primero = 1;
      } else {
        filtros = filtros + '&cnumser_eq=' + this.filtro.get('numSerie').value;
      }
    }
    if (this.filtro.get('idEmpresa').value > 0) {
      if (!primero) {
        filtros = filtros + 'idempresa=' + this.filtro.get('idEmpresa').value;
        primero = 1;
      } else {
        filtros = filtros + '&idempresa_eq=' + this.filtro.get('idEmpresa').value;
      }
    }
    this.filtros = filtros;
    // console.log(URL_CENTOS + '/sensores/' + this.filtros);

    this.source.url = URL_CENTOS + '/sensores/' + this.filtros;
    this.dataAdapter = new jqx.dataAdapter(this.source);

    // this.actualizaGrid();
  }

  clearFilter() {
    this.filtros = '';
    this.ComboAsociacion.clearSelection();
    this.ComboEmpresa.clearSelection();
    this.ComboEstado.clearSelection();
    this.ComboTipoSensor.clearSelection();
    this.filtro.reset();

    this.source.url = URL_CENTOS + '/sensores';
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }

  imprimirSeleccion() {
    const gridContent = this.Grid.exportdata('html');
    const newWindow = window.open('', '', 'width=1200, height=800'),
      document = newWindow.document.open(),
      pageContent =
        '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '<meta charset="utf-8" />\n' +
        '<title>Busqueda portadores</title>\n' +
        '</head>\n' +
        '<body>\n' +
        gridContent +
        '\n</body>\n</html>';
    document.write(pageContent);
    document.close();
    newWindow.print();
  }
}
