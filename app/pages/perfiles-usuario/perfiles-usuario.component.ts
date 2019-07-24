import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { URL_CENTOS } from '../../core/config/config';
import { PerfilesService } from '../../core/services/perfiles.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import swal from 'sweetalert2';
import { HttpService } from '../../core/services/http.service';
import { PerfilesUsuario } from '../../core/models/PerfilesUsuario';
import { PerfilesUsuarioService } from '../../core/services/perfiles-usuario.service';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

@Component({
  selector: 'app-perfiles-usuario',
  templateUrl: './perfiles-usuario.component.html',
  styleUrls: ['./perfiles-usuario.component.scss']
})
export class PerfilesUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChild('Grid') Grid: jqxGridComponent;
  @ViewChild('chk1') check1: ElementRef;
  @ViewChild('chk2') check2: ElementRef;
  @ViewChild('chk3') check3: ElementRef;
  @ViewChild('chk4') check4: ElementRef;
  @ViewChild('chk5') check5: ElementRef;
  @ViewChild('chk6') check6: ElementRef;
  @ViewChild('chk7') check7: ElementRef;
  @ViewChild('chk8') check8: ElementRef;
  @ViewChild('chk9') check9: ElementRef;
  @ViewChild('chk10') check10: ElementRef;
  @ViewChild('chk11') check11: ElementRef;
  @ViewChild('chk12') check12: ElementRef;
  @ViewChild('chk13') check13: ElementRef;
  @ViewChild('chk14') check14: ElementRef;
  @ViewChild('chk15') check15: ElementRef;
  @ViewChild('chk16') check16: ElementRef;

  @ViewChild('input1') txtNombre: ElementRef;
  @ViewChild('input2') txtDescripcion: ElementRef;
  @ViewChild('input3') txtNivelPermisos: ElementRef;

  checks = new Array(
    'chk1',
    'chk2',
    'chk3',
    'chk4',
    'chk5',
    'chk6',
    'chk7',
    'chk8',
    'chk9',
    'chk10',
    'chk11',
    'chk12',
    'chk13',
    'chk14',
    'chk15',
    'chk16'
  );

  tablaChecks: ElementRef[];

  tablaPermisos: Array<any> = [
    new Object({ valor: 1, descripcion: 'ALTA DE TARJETAS', item: 'chk1' }),
    new Object({ valor: 2, descripcion: 'MANTENIMIENTO DE ESTRUCTURAS', item: 'chk2' }),
    new Object({ valor: 4, descripcion: 'MANTENIM PERFILES CATEGORIAS', item: 'chk3' }),
    new Object({ valor: 8, descripcion: 'HABILITACION DE ALERTAS', item: 'chk4' }),
    new Object({ valor: 16, descripcion: 'MANTENIMIENTO DE ALERTAS', item: 'chk5' }),
    new Object({ valor: 32, descripcion: 'MANTENIMIENTO SEGURIDAD ZONAS', item: 'chk6' }),
    new Object({ valor: 64, descripcion: 'CAPTURA DE TARJETAS', item: 'chk7' }),
    new Object({ valor: 128, descripcion: 'VISTA DE SENSORES Y MONTAJES', item: 'chk8' }),
    new Object({ valor: 256, descripcion: 'GESTION USUARIOS DEL SISTEMA', item: 'chk9' }),
    new Object({ valor: 512, descripcion: 'MANTENIMIENTO DE EMPRESAS', item: 'chk10' }),
    new Object({ valor: 1024, descripcion: 'CONSOLA', item: 'chk11' }),
    new Object({ valor: 2048, descripcion: 'EXPORTACION', item: 'chk12' }),
    new Object({ valor: 4096, descripcion: 'VER CAMARAS IP', item: 'chk13' }),
    new Object({ valor: 8192, descripcion: 'ASIGNACION DE PERFILES', item: 'chk14' }),
    new Object({ valor: 16384, descripcion: 'MOVER CAMARAS IP', item: 'chk15' }),
    new Object({ valor: 32768, descripcion: 'GRABAR CAMARAS IP', item: 'chk16' })
  ];

  modo = 'seleccion';

  localizationObject = jqxGrid_ES;

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'nombre', type: 'string' },
      { name: 'descripcion', type: 'string' },
      { name: 'nivelPermisos', type: 'number' },
      { name: 'permisos', type: 'Array<Object>' }
    ],
    id: 'nombre',
    url: URL_CENTOS + '/perfilesUsuario/?_sort=nombre',
    formatdata: function() {
      return '';
    }
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] = [
    { text: 'Nombre', datafield: 'nombre', width: '35%' },
    { text: 'Descripcion', datafield: 'descripcion', width: '65%' }
  ];

  filtro: FormGroup;

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNew = '';
  botonEliminar = '';
  botonModificar = '';

  constructor(
    private _perfilesUsuarioService: PerfilesUsuarioService,
    private _http: HttpService,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.filtro = this.fb.group({
      nombre: new FormControl('', [Validators.required], []),
      descripcion: new FormControl('', [Validators.required], []),
      nivelPermisos: new FormControl('', [Validators.required], [])
    });
  }

  ngAfterViewInit() {
    this.tablaChecks = [
      this.check1,
      this.check2,
      this.check3,
      this.check4,
      this.check5,
      this.check6,
      this.check7,
      this.check8,
      this.check9,
      this.check10,
      this.check11,
      this.check12,
      this.check13,
      this.check14,
      this.check15,
      this.check16
    ];
    this.controlGrid(this.modo);
    this.controlBotones(this.modo);
    this.controlChecks(this.modo);
    this.controlInputs(this.modo);
    this.controlBotonesPrincipales(this.modo);
  }
  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);
    try {
      if (data) {
        this.filtro.get('nombre').setValue(data[0].nombre);
        this.filtro.get('descripcion').setValue(data[0].descripcion);
        this.filtro.get('nivelPermisos').setValue(data[0].nivelPermisos);
        const permisos: string[] = data[0].permisos;
        this.controlChecks('insercion');
        this.uncheckAll();
        this.checkPermisos(permisos);
        this.controlChecks(this.modo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  accionAceptar() {
    console.log('MODO DE OPERACION: =>' + this.modo);
    const perfil: PerfilesUsuario = new PerfilesUsuario();
    this.calculoPermisos();
    if (this.filtro.valid) {
      perfil.nombre = this.filtro.get('nombre').value;
      perfil.descripcion = this.filtro.get('descripcion').value;
      perfil.nivelPermisos = this.filtro.get('nivelPermisos').value;
      // calculamos el valor de los permisos chequeados
      if (this.modo === 'insercion') {
        // REVISION DE QUE HA INSERTADO DATOS EN LOS CAMPOS
        // SETEO DE INFORMACION AL OBJETO USUARIO
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
              this._http.create('/perfilesUsuario', perfil).subscribe((response: any) => {
                console.log(response);
                try {
                  if (response.nombre === perfil.nombre) {
                    swal.fire('Perfil creado', 'El perfil ha sido creado.', 'success');
                  }
                } catch (error) {
                  swal.fire('Error', 'Error en el proceso de creacion', 'error');
                }
                this.modo = 'seleccion';
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
              this._perfilesUsuarioService.update(perfil).subscribe(res => {
                console.log(res);
                console.log('El update supuestamente se hizo con exito.');
                this.accionCancelar();
              });
            }
          });
      }
    }
  }

  accionCancelar() {
    this.modo = 'seleccion';
    this.uncheckAll();
    this.controlBotones(this.modo);
    this.controlBotonesPrincipales(this.modo);
    this.controlGrid(this.modo);
    this.controlChecks(this.modo);
    this.controlInputs(this.modo);
    this.limpiaVariables();
    this.actualizaGrid();
    this.Grid.selectrow(-1);
  }

  botonEditar() {
    if (this.filtro.get('nombre').value) {
      this.modo = 'edicion';
      this.controlBotones(this.modo);
      this.controlBotonesPrincipales(this.modo);
      this.controlChecks(this.modo);
      this.controlGrid(this.modo);
      this.controlInputs(this.modo);
    } else {
      swal.fire('Información', 'Debe seleccionar una fila.', 'info');
    }
  }

  botonBorrar() {
    if (this.filtro.get('nombre').value) {
      // console.log(this.filtro.get('nombre').value);
      // MENSAJE DE CONFIRMACIÓN DE BORRADO
      swal
        .fire({
          title: 'Confirme eliminación',
          text: '¿Está seguro de que desea eliminar el perfil ' + this.filtro.get('nombre').value + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        .then(result => {
          if (result.value) {
            const perfil = new PerfilesUsuario();
            perfil.nombre = this.filtro.get('nombre').value;
            this._http.deleteIdString('/perfilesUsuario', perfil.nombre).subscribe(
              response => {
                console.log(response);
                swal.fire('Perfil Borrado', 'El perfil a sido eliminado correctamente', 'success');
                this.accionCancelar();
              },
              error => {
                swal.fire('Error', 'El perfil no sido eliminado', 'error');
                console.log(error);
              }
            );
          }
        });
    } else {
      swal.fire('Error', 'No ha seleccionado ningun perfil.', 'error');
    }
  }

  botonNuevo() {
    this.modo = 'insercion';
    this.controlBotones(this.modo);
    this.controlBotonesPrincipales(this.modo);
    this.controlGrid(this.modo);
    this.controlChecks(this.modo);
    this.controlInputs(this.modo);
    this.uncheckAll();
    this.limpiaVariables();
    this.Grid.selectrow(-1);
  }

  uncheckAll() {
    this.tablaChecks.forEach(check => {
      if (this.renderer.selectRootElement(check.nativeElement).checked) {
        this.renderer.selectRootElement(check.nativeElement).click();
      }
    });
  }
  checkAll() {
    this.tablaChecks.forEach(check => {
      if (!this.renderer.selectRootElement(check.nativeElement).checked) {
        this.renderer.selectRootElement(check.nativeElement).click();
      }
    });
  }

  statusCheck() {
    this.tablaChecks.forEach(check => {
      console.log(!this.renderer.selectRootElement(check.nativeElement).checked);
    });
  }

  checkPermisos(permisos: string[]) {
    if (permisos.length === 16) {
      this.checkAll();
    }
    for (let index = 0; index < permisos.length; index++) {
      for (let index2 = 0; index2 < this.tablaPermisos.length; index2++) {
        if (permisos[index] === this.tablaPermisos[index2].descripcion) {
          if (!this.renderer.selectRootElement(this.tablaChecks[index2].nativeElement).checked) {
            this.renderer.selectRootElement(this.tablaChecks[index2].nativeElement).click();
          }
        }
      }
    }
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
      this.botonNew = 'disabled';
    } else {
      this.botonEliminar = '';
      this.botonModificar = '';
      this.botonNew = '';
    }
  }

  controlGrid(modo: string) {
    if (modo === 'seleccion') {
      this.Grid.disabled(false);
    } else {
      this.Grid.disabled(true);
    }
  }
  controlChecks(modo: string) {
    if (modo === 'seleccion') {
      this.tablaChecks.forEach(check => {
        this.renderer.setAttribute(check.nativeElement, 'disabled', 'true');
      });
    } else {
      this.tablaChecks.forEach(check => {
        this.renderer.removeAttribute(check.nativeElement, 'disabled');
      });
    }
  }

  controlInputs(modo: string) {
    if (modo === 'seleccion') {
      this.renderer.setAttribute(this.txtNombre.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtDescripcion.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.txtNombre.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtDescripcion.nativeElement, 'disabled');
    }
  }

  limpiaVariables() {
    this.filtro.get('nombre').setValue('');
    this.filtro.get('descripcion').setValue('');
    this.filtro.get('nivelPermisos').setValue('');
  }

  actualizaGrid() {
    this.Grid.updatebounddata('cells');
  }
  calculoPermisos() {
    let suma: number = 0;
    for (let index = 0; index < this.tablaChecks.length; index++) {
      if (this.renderer.selectRootElement(this.tablaChecks[index].nativeElement).checked) {
        suma = suma + this.tablaPermisos[index].valor;
      }
      const element = this.tablaChecks[index];
    }
    this.filtro.get('nivelPermisos').setValue(suma);
    return suma;
  }
  clickchk2() {
    if (!this.renderer.selectRootElement(this.check6.nativeElement).checked) {
      this.renderer.selectRootElement(this.check6.nativeElement).click();
    }
    if (!this.renderer.selectRootElement(this.check8.nativeElement).checked) {
      this.renderer.selectRootElement(this.check8.nativeElement).click();
    }
  }

  clickchk5() {
    if (!this.renderer.selectRootElement(this.check4.nativeElement).checked) {
      this.renderer.selectRootElement(this.check4.nativeElement).click();
    }
    if (!this.renderer.selectRootElement(this.check8.nativeElement).checked) {
      this.renderer.selectRootElement(this.check8.nativeElement).click();
    }
  }
  clickchk7() {
    if (!this.renderer.selectRootElement(this.check8.nativeElement).checked) {
      this.renderer.selectRootElement(this.check8.nativeElement).click();
    }
  }
  clickchk9() {
    for (let index = 0; index < 8; index++) {
      if (!this.renderer.selectRootElement(this.tablaChecks[index].nativeElement).checked) {
        this.renderer.selectRootElement(this.tablaChecks[index].nativeElement).click();
      }
    }
  }
  clickchk15_16() {
    if (!this.renderer.selectRootElement(this.check13.nativeElement).checked) {
      this.renderer.selectRootElement(this.check13.nativeElement).click();
    }
  }
}
