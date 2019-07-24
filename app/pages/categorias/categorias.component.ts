import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { CategoriasService } from '../../core/services/categorias.service';

import { Categoria } from '../../core/models/Categoria';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import swal from 'sweetalert2';
import { URL_ENDPOINT } from '../../core/config/config';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  @ViewChild('myGrid') Grid: jqxGridComponent;
  @ViewChild('txtNombreCategoria') txtNombreCategoria: ElementRef;
  @ViewChild('txtDescCategoria') txtDescCategoria: ElementRef;

  localizationObject: any;

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'nombre', type: 'string' },
      { name: 'descripcion', type: 'string' },
      { name: 'id', type: 'number' }
    ],
    id: 'id',

    url: URL_ENDPOINT + '/categorias',

    formatdata: function() {
      return '';
    }
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] = [
    { text: 'Nombre Categoria', datafield: 'nombre', width: '30%' },
    { text: 'Descripción Categoria', datafield: 'descripcion', width: '70%' }
  ];

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNuevo = '';
  botonEliminar = '';
  botonModificar = '';
  modo = '';

  categoria: Categoria = new Categoria();

  nombreFilter: string;
  descFilter: string;
  idFilter: number;
  titulo: string;
  labelTitulo = 'Mantenimiento de Categorias';

  tableFoot: string;
  labelTableFoot = ' categorías listadas';

  constructor(private _categoriaService: CategoriasService, private renderer: Renderer2) {
    this.titulo = this.labelTitulo;
    this.tableFoot = this.labelTableFoot;

    this.localizationObject = jqxGrid_ES;
    // this.controlTexto( false );
  }

  ngOnInit() {
    this.controlTexto(false);
  }

  actualizaGrid() {
    this.Grid.updatebounddata('cells');
  }

  limpiaVariables() {
    this.idFilter = null;
    this.descFilter = '';
    this.nombreFilter = '';
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
      this.Grid.disabled(true);
    } else {
      this.botonEliminar = '';
      this.botonModificar = '';
      this.botonNuevo = '';
      this.Grid.disabled(false);
    }
  }

  controlTexto(estado: boolean) {
    if (!estado) {
      this.renderer.setAttribute(this.txtNombreCategoria.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtDescCategoria.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.txtNombreCategoria.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtDescCategoria.nativeElement, 'disabled');
    }
  }

  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);

    if (data) {
      this.categoria.id = data[0].id;
      this.categoria.nombre = data[0].nombre;
      this.categoria.descripcion = data[0].descripcion;
      // CARGAMOS LOS DATOS EN SUS RESPECTIvOS CAMPOS

      this.descFilter = this.categoria.descripcion;
      this.nombreFilter = this.categoria.nombre;
      this.idFilter = this.categoria.id;
    }
  }

  nuevaCategoria() {
    // @todo implantar nuevo
    this.modo = 'insercion';
    this.limpiaVariables();
    this.controlBotonesPrincipales(this.modo);
    this.controlBotones(true);
    this.controlTexto(true);

    // actualizar el grid tras la acción
    // this.actualizaGrid();
  }

  borrarCategoria() {
    if (this.categoria.id) {
      // CARGAMOS LOS DATOS EN SUS RESPECTIvOS CAMPOS
      this.descFilter = this.categoria.descripcion;
      this.nombreFilter = this.categoria.nombre;
      this.idFilter = this.categoria.id;
      // MENSAJE DE CONFIRMACIÓN DE BORRADO
      swal
        .fire({
          title: 'Confirme eliminación',
          text: '¿Está seguro de que desea eliminar?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        .then(result => {
          if (result.value) {
            this._categoriaService.delete(this.categoria.id).subscribe(res => {
              console.log(res);
              this.actualizaGrid();
              this.limpiaVariables();
              this.controlTexto(false);
            });
          }
        });
    } else {
      swal.fire('Error', 'Error durante el proceso de borrado, intentelo de nuevo.', 'error');
    }
  }

  editarCategoria() {
    // chequeamos datos
    if (this.idFilter) {
      console.log('modo edicion');
      this.modo = 'edicion';
      this.controlBotones(true);
      this.controlBotonesPrincipales(this.modo);
      this.controlTexto(true);
    } else {
      swal.fire('Información', 'Debe seleccionar una fila.', 'info');
    }

    // actualizar el grid tras la acción
    this.actualizaGrid();
  }

  chequeoCampos(): boolean {
    if (this.nombreFilter.length > 0 && this.descFilter.length > 0) {
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  }

  accionAceptar() {
    console.log('MODO DE OPERACION: =>' + this.modo);

    if (this.modo === 'edicion') {
      if (this.idFilter) {
        this.categoria.id = this.idFilter;
        this.categoria.nombre = this.nombreFilter;
        this.categoria.descripcion = this.descFilter;

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
              this._categoriaService.update(this.categoria).subscribe(() => {
                this.actualizaGrid();
                this.limpiaVariables();
                this.controlBotonesPrincipales('seleccion');
                this.controlBotones(false);
              });
            }
          });
      }
    }
    if (this.modo === 'insercion') {
      // REVISION DE QUE HA INSERTADO DATOS EN LOS CAMPOS

      if (this.chequeoCampos()) {
        // SETEO DE INFORMACION AL OBJETO CATEGORIA
        this.categoria.nombre = this.nombreFilter;
        this.categoria.descripcion = this.descFilter;

        swal
          .fire({
            title: 'Confirme inserción',
            text: '¿Está seguro de que desea insertar esta categoría?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          })
          .then(result => {
            if (result.value) {
              this._categoriaService.create(this.categoria).subscribe(res => {
                console.log(res);
                /*
                if (res.nombre === this.categoria.nombre) {
                  swal.fire('Categoría creada', ' Categoría ha sido creada correctamente', 'success');
                  this.actualizaGrid();
                  this.limpiaVariables();
                  this.controlBotonesPrincipales('seleccion');
                  this.controlBotones(false);
                }*/
                swal.fire('Categoría creada', ' Categoría ha sido creada correctamente', 'success');
                this.actualizaGrid();
                this.accionCancelar();
              });
            }
          });
      } else {
        swal.fire('Parametros no válidos', 'Debe informar los campos Nombre y Descripción', 'error');
      }
    }
  }

  accionCancelar() {
    // desabilita los controles y limpia los cuadros de texto

    this.controlBotones(false);
    this.controlBotonesPrincipales('seleccion');
    // this.controlTexto(false);
    this.limpiaVariables();
    this.controlTexto(false);
  }
}
