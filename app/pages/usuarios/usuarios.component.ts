import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/models/Usuario';
import { EmpresasService } from '../../core/services/empresas.service';

import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { empresas_source, perfilesUsuarios_source } from '../../core/config/dataSources';

import swal from 'sweetalert2';

import { URL_CENTOS } from '../../core/config/config';
import { jqxGrid_ES } from 'translations/jqxGrid_translate';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild('myGrid') Grid: jqxGridComponent;
  @ViewChild('ComboPerfil') ComboPerfil: jqxComboBoxComponent;
  @ViewChild('ComboEmpresa') ComboEmpresa: jqxComboBoxComponent;

  // PARA ACCEDER AL HTML DE LOS ELEMENTOS
  @ViewChild('txtLogin_') txtLogin_: ElementRef;
  @ViewChild('txtNombre_') txtNombre_: ElementRef;
  @ViewChild('txtApellidos_') txtApellidos_: ElementRef;
  @ViewChild('txtDni_') txtDni_: ElementRef;
  @ViewChild('txtPass_') txtPass_: ElementRef;
  @ViewChild('btnPass') btnPass_: ElementRef;
  @ViewChild('chkUser_') chkUser_: ElementRef;

  // empresas_dataAdapter: any;
  // perfilesUsuarios_dataAdapter: any;

  perfilesUsuarios_dataAdapter = new jqx.dataAdapter(perfilesUsuarios_source);
  empresas_dataAdapter = new jqx.dataAdapter(empresas_source);

  // GRID
  localizationObject: any;

  source: any = {
    datatype: 'json',
    datafields: [
      { name: 'login', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'nombre', type: 'string' },
      { name: 'apellidos', type: 'string' },
      { name: 'dni', type: 'string' },
      { name: 'izquierdo', type: 'string' },
      { name: 'derecho', type: 'string' },
      { name: 'ojo', type: 'string' },
      { name: 'perfil', type: 'string' },
      { name: 'idEmpresa', type: 'number' },
      { name: 'nombreEmpresa', type: 'string' }
    ],

    id: 'login',
    url: URL_CENTOS + '/usuarios/?_sort=nombre',
    formatdata: function() {
      return '';
    }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] = [
    { text: 'Login', datafield: 'login', width: '10%' },
    { text: 'Nombre', datafield: 'nombre', width: '15%' },
    { text: 'Apellidos', datafield: 'apellidos', width: '25%' },
    { text: 'Dni', datafield: 'dni', width: '10%' },
    { text: 'Perfil', datafield: 'perfil', width: '20%' },
    { text: 'Empresa', datafield: 'nombreEmpresa', width: '19%' }
  ];

  usuario: Usuario = new Usuario();

  disabled = 'disabled';
  disabled_text = 'disabled';
  botonNuevo = '';
  botonEliminar = '';
  botonModificar = '';

  modo = 'seleccion'; // posibles: seleccion, edicion, insercion

  filtro: FormGroup;

  constructor(private _usuarioService: UsuariosService, private renderer: Renderer2, private fb: FormBuilder) {
    this.localizationObject = jqxGrid_ES;
  }

  ngOnInit() {
    this.filtro = this.fb.group({
      id: new FormControl(''),
      login: new FormControl('', [Validators.required], []),
      nombre: new FormControl('', [Validators.required], []),
      apellidos: new FormControl('', [Validators.required], []),
      password: new FormControl('', [Validators.required], []),
      dni: new FormControl(
        '',
        [Validators.required, Validators.maxLength(9), Validators.pattern('([0-9]{8})([A-Za-z]{1})')],
        []
      ),
      perfil: new FormControl(''),
      izquierdo: new FormControl(''),
      derecho: new FormControl(''),
      ojo: new FormControl(''),
      idEmpresa: new FormControl('')
    });

    this.filtro.markAsUntouched();
    try {
      this.ComboEmpresa.autoComplete(true);
      this.ComboPerfil.autoComplete(true);
    } catch (error) {
      console.log('Fallo al cargar autocomplete');
    }
    this.accionCancelar();
  }

  actualizaGrid() {
    this.Grid.updatebounddata('cells');
  }

  cellClick(event: any) {
    const data: Array<any> = new Array(event.args.row);
    try {
      if (data) {
        this.filtro.get('id').setValue(data[0].id);
        this.filtro.get('nombre').setValue(data[0].nombre);
        this.filtro.get('apellidos').setValue(data[0].apellidos);
        this.filtro.get('login').setValue(data[0].login);
        this.filtro.get('password').setValue(data[0].password);
        this.filtro.get('dni').setValue(data[0].dni);
        this.filtro.get('perfil').setValue(data[0].perfil);
        this.filtro.get('izquierdo').setValue(data[0].izquierdo);
        this.filtro.get('derecho').setValue(data[0].derecho);
        this.filtro.get('ojo').setValue(data[0].ojo);
        this.ComboEmpresa.selectItem(data[0].idEmpresa);
        this.ComboPerfil.selectItem(data[0].perfil);
        if (!this.filtro.get('perfil').value) {
          if (!this.renderer.selectRootElement(this.chkUser_.nativeElement).checked) {
            this.renderer.selectRootElement(this.chkUser_.nativeElement).click();
          }
        }
      }
    } catch (error) {
      // console.log(error);
    }
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

  controlGrid(modo: string) {
    if (modo === 'seleccion') {
      this.Grid.disabled(false);
    } else {
      this.Grid.disabled(true);
    }
  }

  controlTexto(estado: boolean) {
    if (!estado) {
      this.renderer.setAttribute(this.txtLogin_.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtNombre_.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtApellidos_.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.txtDni_.nativeElement, 'disabled', 'true');
      this.ComboPerfil.disabled(true);
      this.ComboEmpresa.disabled(true);
      this.renderer.setAttribute(this.txtPass_.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.btnPass_.nativeElement, 'disabled', 'true');
      this.renderer.setAttribute(this.chkUser_.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.txtLogin_.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtNombre_.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtApellidos_.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.txtDni_.nativeElement, 'disabled');
      this.ComboPerfil.disabled(false);
      this.ComboEmpresa.disabled(false);
      this.renderer.removeAttribute(this.txtPass_.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.btnPass_.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.chkUser_.nativeElement, 'disabled');
    }
  }

  limpiaVariables() {
    this.Grid.clearselection();

    this.filtro.get('id').setValue('');
    this.filtro.get('nombre').setValue('');
    this.filtro.get('apellidos').setValue('');
    this.filtro.get('login').setValue('');
    this.filtro.get('password').setValue('');
    this.filtro.get('dni').setValue('');
    this.ComboEmpresa.clearSelection();
    this.ComboPerfil.clearSelection();
    this.filtro.get('izquierdo').setValue('');
    this.filtro.get('derecho').setValue('');
    this.filtro.get('ojo').setValue('');
  }

  nuevoUsuario() {
    this.modo = 'insercion';
    this.limpiaVariables();
    this.controlBotonesPrincipales(this.modo);
    this.controlGrid(this.modo);
    this.controlBotones(true);
    this.controlTexto(true);
  }

  editarUsuario() {
    // chequeamos datos
    if (this.filtro.get('login').value) {
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

  borrarUsuario() {
    if (this.filtro.get('login').value) {
      console.log(this.filtro.get('id').value);
      // MENSAJE DE CONFIRMACIÓN DE BORRADO
      swal
        .fire({
          title: 'Confirme eliminación',
          text: '¿Está seguro de que desea eliminar a ' + this.filtro.get('nombre').value + '?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        })
        .then(result => {
          if (result.value) {
            const user = new Usuario();
            user.login = this.filtro.get('login').value;
            this._usuarioService.borrarUsuario(user).subscribe(
              response => {
                swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                this.actualizaGrid();
                this.limpiaVariables();
                this.controlTexto(false);
              },
              error => {
                swal.fire('Error', 'El usuario no sido eliminado', 'error');
                console.log(error);
              }
            );
          }
        });
    } else {
      swal.fire('Error', 'No ha seleccionado ningun usuario.', 'error');
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
    const user: Usuario = new Usuario();
    console.log(this.filtro.valid);
    if (this.filtro.valid) {
      user.login = this.filtro.get('login').value;
      user.password = this.filtro.get('password').value;
      user.nombre = this.filtro.get('nombre').value;
      user.apellidos = this.filtro.get('apellidos').value;
      user.dni = this.filtro.get('dni').value;
      user.perfil = this.filtro.get('perfil').value;
      user.idEmpresa = this.filtro.get('idEmpresa').value;
      if (this.modo === 'edicion') {
        user.id = this.filtro.get('id').value;
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
              this._usuarioService.update(user).subscribe(res => {
                console.log(res);
                console.log('El update supuestamente se hizo con exito.');
                this.actualizaGrid();
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
              this._usuarioService.create(user).subscribe(response => {
                console.log(response);
                try {
                  // const newuser: Usuario = response;
                  // if ((newuser.nombre = user.nombre)) {
                  //  swal.fire('Usuario creado', 'El usuario ' + newuser.nombre + ' ha sido creado.', 'success');
                  // }
                  swal.fire('Usuario creado', 'El usuario ha sido creado.', 'success');
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

  cambiarPass() {}

  validateLogin(ctrl: AbstractControl) {
    // por implementar, se necesita respuesta en el backend
    return true;
  }
  limpiarSeleccion() {
    console.log('click');
    if (this.renderer.selectRootElement(this.chkUser_.nativeElement).checked) {
      this.ComboPerfil.clearSelection();
      this.ComboPerfil.disabled(true);
    } else {
      this.ComboPerfil.disabled(false);
    }
  }

  uncheck() {
    console.log('cambio combo');
    if (this.filtro.get('perfil').value) {
      if (this.renderer.selectRootElement(this.chkUser_.nativeElement).checked) {
        this.renderer.selectRootElement(this.chkUser_.nativeElement).click();
      }
    }
  }
}
