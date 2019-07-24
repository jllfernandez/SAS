import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import swal from 'sweetalert2';

import { Generic } from '../models/Generic';
import { NodoPerfil } from '../models/NodoPerfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  private url = '/perfiles';

  constructor(private http: HttpService, private router: Router) {}

  getPerfiles(): Observable<NodoPerfil[]> {
    let url = this.url + '?_sort=descripcion';
    return this.http.getItems(url).pipe(map(response => response as NodoPerfil[]));
  }

  flatToTree(source: NodoPerfil[]): NodoPerfil[] {
    let niveles0: any[] = [];
    let niveles1: any[] = [];
    let niveles2: any[] = [];

    for (var i = 0, max = source.length; i < max; i += 1) {
      let sons: NodoPerfil[] = [];
      source[i].sons = sons;

      if (source[i].estado == 1) {
        let son: NodoPerfil = new NodoPerfil();
        son.descripcion = 'SIP';
        son.idPerfilPadre = source[i].id;
        son.sons = [];
        source[i].sons.push(son);
      }

      if (source[i].estado == 1) {
        //Activado
        source[i].idPerfilPadre = -4;
        niveles0.push(source[i]);
      } else if (source[i].estado == 0) {
        //Baja
        source[i].idPerfilPadre = -2;
        niveles1.push(source[i]);
      } else if (source[i].estado == 2) {
        //Desactivado
        source[i].idPerfilPadre = -3;
        niveles2.push(source[i]);
      }
    }

    let target: NodoPerfil[] = [];

    target[0] = new NodoPerfil();
    target[0].id = -4;
    target[0].idPerfilPadre = 0;
    target[0].descripcion = 'ACTIVADO';
    target[0].estado = 3;
    target[0].sons = niveles0;

    target[1] = new NodoPerfil();
    target[1].id = -2;
    target[1].idPerfilPadre = 0;
    target[1].descripcion = 'DESACTIVADO';
    target[0].estado = 3;
    target[1].sons = niveles2;

    target[2] = new NodoPerfil();
    target[2].id = -3;
    target[2].idPerfilPadre = 0;
    target[2].descripcion = 'BAJA';
    target[0].estado = 3;
    target[2].sons = niveles1;

    let result: NodoPerfil[] = [];
    result[0] = new NodoPerfil();
    result[0].id = 0;
    result[0].descripcion = 'PERFILES';
    result[0].idPerfilPadre = -1;
    target[0].estado = 3;
    result[0].sons = [];

    for (var i = 0, max = target.length; i < max; i += 1) {
      result[0].sons.push(target[i]);
    }
    return result;
  }
}
