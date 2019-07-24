import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EmpresasService } from '@app/core/services/empresas.service';
import { ModalService } from '@app/pages/modal.service';
import { Empresa } from '@app/core/models/Empresa';

import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.scss']
})
export class DetalleEmpresaComponent implements OnInit {
  empresa: Empresa;
  modaleService: ModalService;
  titulo: string = 'Detalle de la empresa';
  progreso: number = 0;
  errores: string[];

  constructor(
    private empresaService: EmpresasService,
    private activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    private router: Router
  ) {
    this.modaleService = modalService;

    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.empresaService.getEmpresaById(id).subscribe(empresa => {
          this.empresa = empresa;
        });
      } else {
        swal.fire('Error', 'No se ha podido cargar la empresa', 'warning');
      }
    });
  }

  ngOnInit() {
    //  this.cargarEmpresa();
  }

  cargarEmpresa() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.empresaService.getEmpresaById(id).subscribe(empresa => {
          this.empresa = empresa;
        });
      } else {
        swal.fire('Error', 'No se ha podido cargar la empresa', 'warning');
      }
    });
  }

  closeModal() {
    this.modaleService.closeModal();
    this.empresa = null;
    this.router.navigate(['empresas']);
  }

  almacenarCambios() {
    console.log(this.empresa);
    this.empresaService.update(this.empresa).subscribe(
      json => {
        swal.fire('Empresa actualizada', '', 'success');
        this.router.navigate(['empresas']);
        swal.fire('Empresa actualizada', `${json.mensaje}: ${json.empresa.NOMBRE}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        swal.fire('No se puedo actualizar', '', 'error');
      }
    );
  }

  changePass() {
    // TODO implements
  }

  aceptar() {
    // TODO implements
  }
}
