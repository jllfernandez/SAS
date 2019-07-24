import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import propios
import { Portador } from '@app/core/models/Portador';
import { PortadoresService } from '@app/core/services/portadores.service';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { Generic } from '@app/core/models/Generic';
import { TipoPortador } from '@app/core/config/config';

@Component({
  selector: 'app-portadores',
  templateUrl: './portadores.component.html',
  styleUrls: ['./portadores.component.scss']
})
export class PortadoresComponent implements OnInit, AfterViewInit {
  requestedId?: number;
  modoDetalle = false;
  portador: Portador;
  indexSelected: any;
  existePhoto = false;
  muestraPhoto = false;
  urlPhoto: any = '/assets/img/no_image_available.png';

  portadorForm: FormGroup = this.fb.group({
    id: [''],
    tipoPortador: ['', Validators.required],
    tipoIdentificacion: ['', Validators.required],
    codigoIdentificacion: ['', Validators.required],
    pin: ['', Validators.required],
    idCategoria: [''],
    nombreCategoria: [''],
    fechaAlta: [''],
    email: [''],
    sexo: [''],
    nombre: ['', Validators.required],
    apellido1: ['', Validators.required],
    apellido2: ['', Validators.required],
    telefono: [''],
    extension: [''],
    tindautoriz: [''],
    fechaNacimiento: [''],
    fechaBaja: [''],
    idEmpresa: [''],
    nombreEmpresa: [''],
    codigoExpediente: [''],
    cnumser: [''],
    foto: [''],
    idFija: [''],
    idTemporal: [''],
    idPerfil: [''],
    descPerfil: [''],
    idPerfil2: [''],
    descPerfil2: [''],
    idPerfil3: [''],
    descPerfil3: [''],
    idPerfil4: [''],
    descPerfil4: [''],
    idPerfil5: [''],
    descPerfil5: [''],
    tipoEvento: ['']
  });

  // jqx ComboBox
  @ViewChild('select_portador') s_tipo: jqxComboBoxComponent;

  // jqx ComboBox dataAdapter
  tipoPortadorData: any;
  documentos_dataAdapter: any;
  tipoPortadores_dataAdapter: any;
  categorias_dataAdapter: any;
  empresas_dataAdapter: any;
  perfiles_dataAdapter: any;

  constructor(
    private http: HttpClient,
    private portadores_service: PortadoresService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    const portadores_source = {
      datatype: 'json',
      datafields: [{ name: 'id', type: 'number' }, { name: 'nombre', type: 'string' }],
      url: 'http://centos.shsconsultores.es:8080/es/enumerados/TPORTADOR/valores',
      formatdata: function() {
        return '';
      }
    };

    this.tipoPortadores_dataAdapter = new jqx.dataAdapter(portadores_source);
  }

  ngOnInit() {
    this.portador = new Portador();

    console.log(this.route.data);

    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => of(params.get('id'))))
      .subscribe(found => (this.requestedId = Number.parseInt(found, null)));

    if (this.requestedId) {
      this.modoDetalle = true;
      this.portadores_service.getPortadorById(this.requestedId).subscribe(success => {
        for (const key in success) {
          if (success.hasOwnProperty(key)) {
            this.portador[key] = success[key];
            if (this.portadorForm.controls[key]) {
              this.portadorForm.controls[key].setValue(this.portador[key]);

              if (key === 'foto' && this.portador[key] === 1) {
                this.existePhoto = true;
                this.muestraPhoto = true;
                this.urlPhoto = `http://centos.shsconsultores.es:8080/es/fotos/${this.requestedId}`;
              }
            }
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    console.log(this.portador);
    console.log(this.portadorForm);
    console.log(this.modoDetalle);
  }

  mostrarFoto(): void {
    if (this.urlPhoto !== '/assets/img/no_image_available.png') {
      this.urlPhoto = '/assets/img/no_image_available.png';
      this.muestraPhoto = false;
    } else {
      this.urlPhoto = `http://centos.shsconsultores.es:8080/es/fotos/${this.requestedId}`;
      this.muestraPhoto = true;
    }
  }

  tabController(event: any) {
    // console.log(event);
  }

  onSubmit() {}
}
