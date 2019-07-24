// Angular imports
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// 3rd-party components
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import swal from 'sweetalert2';
// Personal imports
import { Empresa } from '../../core/models/Empresa';
import { EmpresasService } from '../../core/services/empresas.service';
import { URL_ENDPOINT } from '@app/core/config/config';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements AfterViewInit, OnInit {
  // Variables propias
  empresa: Empresa;
  selectedRow: any;
  confirmMode: string;
  mode: string;
  @ViewChild('actionsGroup') actionsGroup: ElementRef;
  @ViewChild('optionsGroup') optionsGroup: ElementRef;
  @ViewChild('empresasInput') empresasInput: ElementRef;

  // jqx Grid
  @ViewChild('gridCompanies') myGrid: jqxGridComponent;
  source: any;
  dataAdapter: any;
  columns: any[];
  columngroups?: any[];
  filtergroup: any;
  localizationObject: any;

  constructor(private service: EmpresasService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.empresa = new Empresa();

    // jqx Grid
    this.localizationObject = jqxGrid_ES;

    this.source = {
      datatype: 'json',
      datafields: [{ name: 'id', type: 'int' }, { name: 'nombre', type: 'string' }],
      root: 'empresas',
      record: '',
      id: 'id',
      url: URL_ENDPOINT + '/empresas/',
      formatdata: function() {
        return '';
      }
    };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [{ text: 'Nombre', datafield: 'nombre' }];
  }

  ngAfterViewInit() {
    this.cambioEstadoInputs('reset');
  }

  ngOnInit() {}

  // Evento asigando al click de las filas del grid de empresas
  rowclick(event: any): void {
    const dataId = this.myGrid.getrowid(event.args.rowindex);
    const dataRow = this.myGrid.getrowdatabyid(dataId);
    this.empresaSeleccionada(dataRow);
    this.validate('row');
  }

  // Pasa los datos de la fila seleccionada en el grid al modelo
  empresaSeleccionada(data: any) {
    const { id, nombre } = data;
    this.empresa.id = id;
    this.empresa.nombre = nombre;
    console.log(`(Empresa) id: ${this.empresa.id} nombre: ${this.empresa.nombre}`);
    this.empresasInput.nativeElement.value = this.empresa.nombre;
  }

  // Alta a traves del servicio
  altaEmpresa(): void {
    console.log('Alta nueva');
    this.validate('new');
    this.confirmMode = 'new';
  }
  // Edicion a traves del servicio
  editarEmpresa(): void {
    console.log('Modificación');
    this.validate('edit');
    this.confirmMode = 'edit';
  }
  // Borrado a traves del servicio
  borrarEmpresa(): void {
    console.log('Borrado');
    this.confirmMode = 'delete';
    if (this.empresasInput.nativeElement.value !== '') {
      swal
        .fire({
          title: '¿Estás seguro?',
          text: 'No podras dar marcha atrás!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        })
        .then(result => {
          if (result.value) {
            this.service.delete(this.empresa).subscribe(success => {
              swal.fire('¡Borrado!', 'Empresa eliminada correctamente', 'success');
              this.validate('all');
              this.myGrid.updatebounddata('cells');
            });
          }
        });
    } else {
      this.mostrarAvisoValidacion('borrar');
    }
  }

  // Distintos tipos de validación y estado de campos de la vista
  validate(mode: string): void {
    this.limpiaValidacionPrevia();
    if (mode === 'all') {
      this.empresasInput.nativeElement.value = '';
      this.empresasInput.nativeElement.setAttribute('disabled', '');
      this.confirmMode = '';
      this.myGrid.disabled(false);
      this.myGrid.selectrow(-1);
      this.cambioEstadoInputs('reset');
    }
    if (mode === 'row') {
      this.empresasInput.nativeElement.setAttribute('disabled', '');
    }
    if (mode === 'new') {
      this.empresasInput.nativeElement.value = '';
      this.empresasInput.nativeElement.removeAttribute('disabled');
      this.confirmMode = 'new';
      this.myGrid.disabled(true);
      this.cambioEstadoInputs('normal');
    }
    if (mode === 'edit') {
      if (this.empresasInput.nativeElement.value !== '') {
        this.empresasInput.nativeElement.removeAttribute('disabled');
        this.confirmMode = 'edit';
        this.myGrid.disabled(true);
        this.cambioEstadoInputs('normal');
      } else {
        this.mostrarAvisoValidacion('editar');
      }
    }
  }

  // Distintos tipos de errores obtenidos en la validacion
  mostrarAvisoValidacion(action: string): void {
    let emptyAlert: any;

    this.limpiaValidacionPrevia();

    if (action === 'crear') {
      emptyAlert = `<span id="validador" class="validators text-danger">*Para ${action}, el nombre no puede estar vacío</span>`;
    } else {
      emptyAlert = `<span id="validador" class="validators text-danger">*Para ${action}, seleccione una fila de la tabla primero</span>`;
    }
    this.empresasInput.nativeElement.insertAdjacentHTML('afterend', emptyAlert);
  }

  // Limpia validarores en el caso de que los haya
  limpiaValidacionPrevia(): void {
    if (document.getElementById('validador') != null) {
      document.getElementById('validador').remove();
    }
  }

  // Metodo para activar/desactivar acciones y opciones
  cambioEstadoInputs(mode: string): void {
    if (mode === 'normal') {
      for (const children of this.actionsGroup.nativeElement.children) {
        children.setAttribute('disabled', '');
      }
      for (const children of this.optionsGroup.nativeElement.children) {
        children.removeAttribute('disabled');
      }
    }

    if (mode === 'reset') {
      for (const children of this.actionsGroup.nativeElement.children) {
        children.removeAttribute('disabled');
      }
      for (const children of this.optionsGroup.nativeElement.children) {
        children.setAttribute('disabled', '');
      }
    }
  }

  confirmar(): void {
    this.empresa.nombre = this.empresasInput.nativeElement.value;
    if (this.confirmMode === 'new') {
      this.empresa.id = null;
      if (this.empresasInput.nativeElement.value !== '') {
        console.log('Creando...');
        this.service.create(this.empresa).subscribe(success => {
          swal.fire('Creación!', 'Empresa creada correctamente', 'success');
          this.validate('all');
          this.myGrid.updatebounddata('cells');
        });
      } else {
        this.mostrarAvisoValidacion('crear');
      }
    }

    if (this.confirmMode === 'edit') {
      console.log('Actualizando...');
      this.service.update(this.empresa).subscribe(success => {
        swal.fire('¡Edición!', 'Empresa actualizada correctamente', 'success');
        this.validate('all');
        this.myGrid.updatebounddata('cells');
      });
    }
  }

  cancelar(): void {
    this.validate('all');
  }

  // Metodo de jqx-Grid para el renderizado de columnas
  cellsrenderer = (
    row: number,
    columnfield: string,
    value: string | number,
    defaulthtml: string,
    columnproperties: any,
    rowdata: any
  ): string => {
    if (value < 20) {
      return (
        '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>'
      );
    } else {
      return (
        '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>'
      );
    }
  };
}
