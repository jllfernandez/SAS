import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { URL_CENTOS } from '@app/core/config/config';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

import swal from 'sweetalert2';
import { AnalizadorEvento } from '@app/core/models/AnalizadorEvento';
import { HttpService } from '../../core/services/http.service';
import { AnalizadorEventosService } from '@app/core/services/analizadorEventos.service';

@Component({
  selector: 'app-analizador-eventos',
  templateUrl: './analizador-eventos.component.html',
  styleUrls: ['./analizador-eventos.component.scss']
})
export class AnalizadorEventosComponent implements OnInit {
  @ViewChild('grid') grid: jqxGridComponent;

  @ViewChild('optManual') optManual: ElementRef;
  @ViewChild('optAuto') optAuto: ElementRef;

  @ViewChild('idanaliza') txtIdanaliza: ElementRef;
  @ViewChild('nombre') txtNombre: ElementRef;
  @ViewChild('pc') txtPC: ElementRef;
  @ViewChild('portconsolas') txtPortConsola: ElementRef;
  @ViewChild('portadmin') txtPortAdmin: ElementRef;
  @ViewChild('password') txtPassword: ElementRef;

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNuevo = '';
  botonEliminar = '';
  botonModificar = '';

  modo = 'seleccion'; // posibles: seleccion, edicion, insercion

  localizationObject: any;

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'idanaliza', type: 'number' },
      { name: 'nombre', type: 'string' },
      { name: 'pc', type: 'string' },
      { name: 'portconsolas', type: 'number' },
      { name: 'portadmin', type: 'number' },
      { name: 'ce', type: 'string' }
    ],

    id: 'id',
    // url: 'http://localhost:3000/analizadorEventos/',
    url: URL_CENTOS + '/analizadores/',
    formatdata: function() {
      return '';
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] = [
    { text: 'Nombre', datafield: 'nombre', width: '30%' },
    { text: 'PC', datafield: 'pc', width: '30%' },
    { text: 'Puerto C.', datafield: 'portconsolas', width: '20%' },
    { text: 'Puerto Adm.', datafield: 'portadmin', width: '20%' }
  ];

  formulario: FormGroup;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private _http: HttpService,
    private _analizadorEventos: AnalizadorEventosService
  ) {}

  ngOnInit() {
    this.modo = 'seleccion';
    this.localizationObject = jqxGrid_ES;

    this.formulario = this.fb.group({
      idanaliza: new FormControl('', [], []),
      nombre: new FormControl('', [Validators.required], []),
      pc: new FormControl('', [Validators.required], []),
      portconsolas: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,5}')], []),
      portadmin: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,5}')], []),
      ce: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.formulario.markAsUntouched();

    this.controlBotones(this.modo);
    this.controlBotonesPrincipales(this.modo);
    this.controlTexto(this.modo);
  }

  limpiaVariables() {
    this.grid.clearselection();

    this.formulario.reset();
  }

  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);
    try {
      // console.log(data[0]);
      if (data) {
        this.formulario.get('idanaliza').setValue(data[0].idanaliza);
        this.formulario.get('nombre').setValue(data[0].nombre);
        this.formulario.get('pc').setValue(data[0].pc);
        this.formulario.get('portconsolas').setValue(data[0].portconsolas);
        this.formulario.get('portadmin').setValue(data[0].portadmin);
        this.formulario.get('ce').setValue(data[0].ce);
      }
    } catch (error) {
      console.log('No data to display');
    }
  }

  nuevoAnalizador() {
    this.modo = 'insercion';
    this.limpiaVariables();
    this.controlBotonesPrincipales(this.modo);
    this.controlGrid(this.modo);
    this.controlBotones(this.modo);
    this.controlTexto(this.modo);
  }

  editarAnalizador() {
    // chequeamos datos
    if (this.formulario.get('idanaliza').value) {
      console.log('modo edicion');
      this.modo = 'edicion';
      this.controlGrid(this.modo);
      this.controlBotones(this.modo);
      this.controlBotonesPrincipales(this.modo);
      this.controlTexto(this.modo);
    } else {
      swal.fire('Información', 'Debe seleccionar una fila.', 'info');
    }
  }
  eliminarAnalizador() {
    if (this.formulario.get('idanaliza').value) {
      // MENSAJE DE CONFIRMACIÓN DE BORRADO
      swal
        .fire({
          title: 'Confirme eliminación',
          text: '¿Está seguro de que desea eliminar ' + this.formulario.get('nombre').value + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        .then(result => {
          if (result.value) {
            let analizador = new AnalizadorEvento();
            analizador.idanaliza = this.formulario.get('idanaliza').value;
            this._analizadorEventos.delete(analizador).subscribe(
              response => {
                console.log(response);
                this.actualizaGrid();
                this.accionCancelar();
                swal.fire('Perfil Borrado', 'El analizador a sido eliminado correctamente', 'success');
              },
              error => {
                swal.fire('Error', 'El perfil no sido eliminado', 'error');
                console.log(error);
              }
            );
          }
        });
    } else {
      swal.fire('Error', 'No ha seleccionado ningun analizador.', 'error');
    }
  }
  accionAceptar() {
    console.log('MODO DE OPERACION: =>' + this.modo);

    const analizador: AnalizadorEvento = new AnalizadorEvento();
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      analizador.idanaliza = this.formulario.get('idanaliza').value;
      analizador.nombre = this.formulario.get('nombre').value;
      analizador.pc = this.formulario.get('pc').value;
      analizador.portconsolas = this.formulario.get('portconsolas').value;
      analizador.portadmin = this.formulario.get('portadmin').value;
      analizador.ce = this.formulario.get('ce').value;
      console.log(analizador);
      // habria que implementar en la contraseña la encriptacion
      // o ver que es eso de la contraseña automatica
      if (this.modo === 'insercion') {
        // REVISION DE QUE HA INSERTADO DATOS EN LOS CAMPOS
        // SETEO DE INFORMACION AL OBJETO USUARIO
        swal
          .fire({
            title: 'Confirme inserción',
            text: '¿Está seguro de que desea insertar este servidor?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          })
          .then(result => {
            if (result.value) {
              this._analizadorEventos.create(analizador).subscribe((response: any) => {
                console.log(response.idanaliza);
                try {
                  if (response.idanaliza) {
                    swal.fire('Analizador creado', 'El Analizador de eventos ha sido creado.', 'success');
                  }
                } catch (error) {
                  swal.fire('Error', 'Error en el proceso de creacion', 'error');
                }
                this.modo = 'seleccion';
                this.actualizaGrid();
                this.accionCancelar();
              });
            } else {
              console.log('Filtro invalido.');
            }
          });
      }

      if (this.modo === 'edicion') {
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
              this._analizadorEventos.update(analizador).subscribe(res => {
                console.log(res);
                // @todo implementar el control de la respuesta
                console.log('El update se ejecuto con exito.');
                this.modo = 'seleccion';
                this.actualizaGrid();
                this.accionCancelar();
              });
            }
          });
      }
    }
  }
  accionCancelar() {
    // desabilita los controles y limpia los cuadros de texto
    this.controlBotones(this.modo);
    this.controlBotonesPrincipales('seleccion');
    this.controlGrid('seleccion');
    this.limpiaVariables();
    this.controlTexto(this.modo);
    this.modo = 'seleccion';
  }

  changeAuto() {
    // desactivar el texto del option manual
    this.renderer.setAttribute(this.txtPassword.nativeElement, 'disabled', 'true');
  }
  changeManual() {
    // activar el texto del option manual
    this.renderer.removeAttribute(this.txtPassword.nativeElement, 'disabled');
  }

  actualizaGrid() {
    this.grid.updatebounddata('cells');
  }

  controlBotones(modo: string) {
    if (modo === 'seleccion') {
      this.disabled = 'disabled';
    } else {
      this.disabled = '';
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

  controlGrid(modo: string) {
    if (modo === 'seleccion') {
      this.grid.disabled(false);
    } else {
      this.grid.disabled(true);
    }
  }

  controlTexto(estado: string) {
    if (estado === 'seleccion') {
      this.renderer.setAttribute(this.txtPC.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtNombre.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtPortAdmin.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtPortConsola.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtPassword.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.optManual.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.optAuto.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.txtPC.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtNombre.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtPortConsola.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtPortAdmin.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtPassword.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.optAuto.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.optManual.nativeElement, 'disabled');
    }
  }
}
