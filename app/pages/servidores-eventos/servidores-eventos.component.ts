import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { estados_eventos_source, analizador_eventos_source } from '@app/core/config/dataSources';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

//import { jqxGrid_ES } from 'translations/jqxGrid_translate';
import { TranslateService } from '@ngx-translate/core';

import { EventosService } from '../../core/services/eventos.service';

import { Evento } from '../../core/models/Evento';
import { URL_ENDPOINT } from '../../core/config/config';

import swal from 'sweetalert2';

@Component({
  selector: 'app-servidores-eventos',
  templateUrl: './servidores-eventos.component.html',
  styleUrls: ['./servidores-eventos.component.scss']
})
export class ServidoresEventosComponent implements OnInit {
  @ViewChild('myGrid') grid: jqxGridComponent;
  @ViewChild('ComboEstado') ComboEstado: jqxComboBoxComponent;
  @ViewChild('ComboAnalizador') ComboAnalizador: jqxComboBoxComponent;

  // PARA ACCEDER AL HTML DE LOS ELEMENTOS
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('pc') pc: ElementRef;
  @ViewChild('analizerport') analizerport: ElementRef;
  @ViewChild('consoleport') consoleport: ElementRef;
  @ViewChild('srvport') srvport: ElementRef;
  @ViewChild('adminport') adminport: ElementRef;
  @ViewChild('analizerportevents') analizerportevents: ElementRef;
  @ViewChild('countport') countport: ElementRef;

  filtros = '';
  estadosArr: any[];
  analizadoresArr: any[];

  // GRID
  localizationObject: any;

  estados_dataAdapter = new jqx.dataAdapter(estados_eventos_source);
  analizador_dataAdapter = new jqx.dataAdapter(analizador_eventos_source);

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'idserver', type: 'number' },
      { name: 'nombre', type: 'string' },
      { name: 'pc', type: 'string' },
      { name: 'estadoserver', type: 'number' },
      { name: 'estadoserverdesc', type: 'string' },
      { name: 'puerto', type: 'string' },
      { name: 'idanaliza', type: 'string' },
      { name: 'portconsolas', type: 'string' },
      { name: 'portadmin', type: 'string' },
      { name: 'porttesrvrev', type: 'string' },
      { name: 'portteanali', type: 'string' },
      { name: 'porttecontador', type: 'string' }
    ],

    id: 'login',
    url: URL_ENDPOINT + '/servidoresEventos/?_sort=nombre',
    formatdata: function() {
      return '';
    }
  };

  tipoEstadoRenderer = (
    row: any,
    datafield: any,
    value: any,
    defaultcellsrenderer: any,
    columnProperties: any,
    rowData: any
  ): string => {
    return (
      '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
      this.estados_dataAdapter[rowData.estadoserver] +
      '</div>'
    );
  };

  tipoEstadoRendererDesc = (
    row: any,
    datafield: any,
    value: any,
    defaultcellsrenderer: any,
    columnProperties: any,
    rowData: any
  ): string => {
    return (
      '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
      this.renderEstados([rowData.estadoserver]) +
      '</div>'
    );
  };

  tipoAnalizadorRendererDesc = (
    row: any,
    datafield: any,
    value: any,
    defaultcellsrenderer: any,
    columnProperties: any,
    rowData: any
  ): string => {
    return (
      '<div class="jqx-grid-cell-left-align" style="margin-top: 8px;">' +
      this.renderAnalizadores([rowData.idanaliza]) +
      '</div>'
    );
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'idserver', datafield: 'idserver', width: '25%', hidden: true },
    { text: this.translate.instant('nombre'), datafield: 'nombre', width: '25%' },
    { text: this.translate.instant('pc'), datafield: 'pc', width: '10%' },
    {
      text: this.translate.instant('estado'),
      datafield: 'estadoserver',
      width: '25%',
      hidden: true
    },
    {
      text: this.translate.instant('estado'),
      datafield: 'estadoserverdesc',
      width: '20%',
      cellsrenderer: this.tipoEstadoRendererDesc
    },
    { text: this.translate.instant('analizerport'), datafield: 'puerto', width: '20%' },
    { text: this.translate.instant('analizer'), datafield: 'idanaliza', width: '20%', hidden: true },
    {
      text: this.translate.instant('analizer'),
      datafield: 'idanalizadec',
      width: '20%',
      cellsrenderer: this.tipoAnalizadorRendererDesc
    },
    { text: this.translate.instant('consoleport'), datafield: 'portconsolas', width: '20%' },
    { text: this.translate.instant('adminport'), datafield: 'portadmin', width: '20%' },
    { text: this.translate.instant('srvport'), datafield: 'porttesrvrev', width: '20%' },
    { text: this.translate.instant('analizerportevents'), datafield: 'portteanali', width: '20%' },
    { text: this.translate.instant('countport'), datafield: 'porttecontador', width: '20%' }
  ];

  filtro: FormGroup;

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNuevo = '';
  botonEliminar = '';
  botonModificar = '';

  modo = 'seleccion'; // posibles: seleccion, edicion, insercion

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private renderer: Renderer2,
    private eventosService: EventosService
  ) {}

  ngOnInit() {
    this.eventosService.getEstados().subscribe(response => {
      this.estadosArr = response;
    });

    this.eventosService.getAnalizadores().subscribe(response => {
      this.analizadoresArr = response;
    });

    this.filtro = this.fb.group({
      idserver: new FormControl(''),
      nombre: new FormControl(''),
      pc: new FormControl('', []),
      estadoserver: new FormControl('', []),
      analizerport: new FormControl('', []),
      analizer: new FormControl('', []),
      consoleport: new FormControl('', []),
      adminport: new FormControl('', []),
      srvport: new FormControl('', []),
      analizerportevents: new FormControl('', []),
      countport: new FormControl('', [])
    });

    this.actualizaGrid();

    this.controlTexto(false);
  }

  renderAnalizadores(key: any): string {
    let result: string = '';
    for (var i = 0, max = this.analizadoresArr.length; i < max; i += 1) {
      let arr: any[] = this.analizadoresArr[i];
      if (key == this.analizadoresArr[i].idanaliza) {
        result = this.analizadoresArr[i].nombre;
      }
    }

    return result;
  }
  renderEstados(key: any): string {
    let result: string = '';
    for (var i = 0, max = this.estadosArr.length; i < max; i += 1) {
      let arr: any[] = this.estadosArr[i];
      if (key == this.estadosArr[i].id) {
        result = this.estadosArr[i].nombre;
      }
    }

    return result;
  }

  createColumnsGrid(): any[] {
    let columns: any[] = [
      { text: 'idserver', datafield: 'idserver', width: '25%', hidden: true },
      { text: this.translate.instant('nombre'), datafield: 'nombre', width: '25%' },
      { text: this.translate.instant('pc'), datafield: 'pc', width: '10%' },
      {
        text: this.translate.instant('estado'),
        datafield: 'estadoserver',
        width: '25%',
        cellsrenderer: this.tipoEstadoRenderer
      },
      { text: this.translate.instant('analizerport'), datafield: 'puerto', width: '20%' },
      { text: this.translate.instant('analizer'), datafield: 'idanaliza', width: '20%' },
      { text: this.translate.instant('consoleport'), datafield: 'portconsolas', width: '20%' },
      { text: this.translate.instant('adminport'), datafield: 'portadmin', width: '20%' },
      { text: this.translate.instant('srvport'), datafield: 'porttesrvrev', width: '20%' },
      { text: this.translate.instant('analizerportevents'), datafield: 'portteanali', width: '20%' },
      { text: this.translate.instant('countport'), datafield: 'porttecontador', width: '20%' }
    ];
    return columns;
  }

  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);

    try {
      console.log(data[0]);
      if (data) {
        this.filtro.get('idserver').setValue(data[0].idserver);
        this.filtro.get('nombre').setValue(data[0].nombre);
        this.filtro.get('pc').setValue(data[0].pc);
        //this.filtro.get('estadoserver').setValue(data[0].estadoserver);
        this.filtro.get('analizerport').setValue(data[0].puerto);
        this.filtro.get('consoleport').setValue(data[0].portconsolas);
        this.filtro.get('adminport').setValue(data[0].portadmin);
        this.filtro.get('srvport').setValue(data[0].porttesrvrev);
        this.filtro.get('analizerportevents').setValue(data[0].portteanali);
        this.filtro.get('countport').setValue(data[0].porttecontador);

        this.ComboEstado.selectItem(data[0].estadoserver);
        this.ComboAnalizador.selectItem(data[0].idanaliza);
      }
    } catch (error) {
      console.log(error);
    }
  }

  controlGrid(modo: string) {
    if (modo === 'seleccion') {
      this.grid.disabled(false);
    } else {
      this.grid.disabled(true);
    }
  }

  actualizaGrid() {
    this.grid.updatebounddata('cells');
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

  accionCancelar() {
    // desabilita los controles y limpia los cuadros de texto
    this.controlBotones(false);
    this.controlBotonesPrincipales('seleccion');
    this.controlGrid('seleccion');
    this.limpiaVariables();
    this.controlTexto(false);
    this.modo = 'seleccion';
  }

  accionAceptar() {
    console.log('MODO DE OPERACION: =>' + this.modo);
    const evento: Evento = new Evento();
    console.log(this.filtro.valid);

    if (this.filtro.valid) {
      evento.nombre = this.filtro.get('nombre').value;
      evento.pc = this.filtro.get('pc').value;
      evento.estadoserver = this.ComboEstado.getSelectedItem().originalItem.id;
      evento.idanaliza = this.ComboAnalizador.getSelectedItem().originalItem.idanaliza;
      evento.portconsolas = parseInt(this.filtro.get('consoleport').value);
      evento.puerto = parseInt(this.filtro.get('analizerport').value);
      evento.portadmin = parseInt(this.filtro.get('adminport').value);
      evento.porttesrvrev = parseInt(this.filtro.get('srvport').value);
      evento.portteanali = parseInt(this.filtro.get('analizerportevents').value);
      evento.porttecontador = parseInt(this.filtro.get('countport').value);

      if (this.modo === 'edicion') {
        evento.idserver = parseInt(this.filtro.get('idserver').value);
        evento.id = evento.idserver;
        console.log(evento);
        swal
          .fire({
            title: 'Confirme edición',
            text: '¿Está seguro de que desea modificar?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          })
          .then(result => {
            if (result.value) {
              this.eventosService.update(evento).subscribe(res => {
                console.log(res);
                console.log('El update supuestamente se hizo con exito.');
                //dataSourceTabla
                this.actualizaGrid();
                this.controlGrid(this.modo);
                this.accionCancelar();
              });
            }
          });
      }
    }
    if (this.modo === 'insercion') {
      // REVISION DE QUE HA INSERTADO DATOS EN LOS CAMPOS
      // SETEO DE INFORMACION AL OBJETO USUARIO
      if (this.filtro.valid) {
        evento.idserver = null;
        evento.id = null;
        swal
          .fire({
            title: 'Confirme inserción',
            text: '¿Está seguro de que desea insertar este Servidor de Eventos?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          })
          .then(result => {
            if (result.value) {
              console.log(evento);
              this.eventosService.create(evento).subscribe(response => {
                console.log(response);
                try {
                  let nuevoEvento: Evento = <Evento>response;
                  if ((nuevoEvento.nombre = evento.nombre)) {
                    swal.fire('Servidor creado', 'El Servidor de Eventos ha sido creado.', 'success');
                  }
                } catch (error) {
                  swal.fire('Error', 'Error en el proceso de creacion', 'error');
                }
                this.modo = 'seleccion';
                this.actualizaGrid();
                this.controlGrid(this.modo);
                this.accionCancelar();
              });
            } else {
              console.log('Filtro invalido.');
            }
          });
      }
    }
  }

  nuevoEvento() {
    this.modo = 'insercion';
    this.limpiaVariables();
    this.controlBotonesPrincipales(this.modo);
    this.controlGrid(this.modo);
    this.controlBotones(true);
    this.controlTexto(true);
  }

  detailEvento() {
    // chequeamos datos
    if (this.filtro.get('nombre').value) {
      console.log('modo edicion');
      this.modo = 'edicion';
      this.controlGrid(this.modo);
      this.controlBotones(true);
      this.controlBotonesPrincipales(this.modo);
      this.controlTexto(true);
    } else {
      swal.fire('Información', 'Debe seleccionar una fila.', 'info');
    }
  }
  //////////////////////
  controlTexto(estado: boolean) {
    if (!estado) {
      this.renderer.setAttribute(this.nombre.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.pc.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.analizerport.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.consoleport.nativeElement, 'disabled', 'true');
      this.ComboEstado.disabled(true);
      this.ComboAnalizador.disabled(true);

      this.renderer.setAttribute(this.srvport.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.adminport.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.analizerportevents.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.countport.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.nombre.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.pc.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.analizerport.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.consoleport.nativeElement, 'disabled');
      this.ComboEstado.disabled(false);
      this.ComboAnalizador.disabled(false);
      this.renderer.removeAttribute(this.srvport.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.adminport.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.analizerportevents.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.countport.nativeElement, 'disabled');
    }
  }

  limpiaVariables() {
    this.grid.clearselection();

    this.filtro.get('idserver').setValue('');
    this.filtro.get('nombre').setValue('');
    this.filtro.get('pc').setValue('');
    this.filtro.get('analizerport').setValue('');
    this.filtro.get('consoleport').setValue('');
    this.filtro.get('adminport').setValue('');
    this.filtro.get('srvport').setValue('');
    this.filtro.get('analizerportevents').setValue('');
    this.filtro.get('countport').setValue('');

    this.ComboEstado.clearSelection();
    this.ComboAnalizador.clearSelection();
  }
}
