import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import swal from 'sweetalert2';

import { Generic } from '../models/Generic';
import { NodoZona } from '../models/NodoZona';
import { NodoSensor } from '../models/NodoSensor';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private url = '/zonas';
  private urlSensoresByZona = '/zonasSensores?idZona=';

  constructor(private http: HttpService, private router: Router) {}

  getZonas(): Observable<NodoZona[]> {
    let url = this.url + '?_sort=descripcion';
    return this.http.getItems(url).pipe(map(response => response as NodoZona[]));
  }

  getSensoresByZona(idZona: any): Observable<NodoSensor[]> {
    let url = this.urlSensoresByZona + idZona + '&_sort=alias';
    return this.http.getItems(url).pipe(map(response => response as NodoSensor[]));
  }

  /*
  getZonasFilter(termino: string): Observable<NodoZona[]> {
    return this.http.get(this.urlEndPoint + '/?q=' + termino).pipe(map(response => response as NodoZona[]));
  }
*/
  create(zona: NodoZona): Observable<Generic> {
    return this.http.create(this.url, zona).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      catchError(e => {
        console.log('Error--->');
        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Generic> {
    return this.http.delete(this.url, id).pipe(
      map(res => {
        swal.fire('¡Borrado!', 'Zona eliminada correctamente', 'success');
        return null;
      }),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }

        swal.fire(e.error.message, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(zona: NodoZona): Observable<Generic> {
    return this.http.update(this.url, zona).pipe(
      map(response => {
        console.log(response);
        swal.fire('¡Actualizado!', 'Zona modificada correctamente', 'success');
        return response;
      }),
      catchError(e => {
        console.log('Error--->');
        if (e.status === 400) {
          return throwError(e);
        }

        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  flatToTree(mode: number, source: NodoZona[]): NodoZona[] {
    if (mode == 1) {
      return this.flatToTreeByLevel(source);
    } else {
      return this.flatToTreeByHierarchy(source);
    }
  }

  flatToTreeByHierarchy(source: NodoZona[]): NodoZona[] {
    for (var i = 0, max = source.length; i < max; i += 1) {
      source[i].descTipoZona = this.renderTipoZona(source[i].tipoZona);

      let father = source[i].idZonaPadre;

      for (var j = 0, maxi = source.length; j < maxi; j += 1) {
        if (source[j].id == father) {
          if (source[j].sons == null) {
            let sons: NodoZona[] = [];
            source[j].sons = sons;
          }
          source[j].sons.push(source[i]);
          break;
        }
      }
      if (source[i].sons == null) {
        let sons: NodoZona[] = [];
        source[i].sons = sons;
      }
    }

    let target: NodoZona[] = [];
    let cont = 0;

    for (var i = 0, max = source.length; i < max; i += 1) {
      if (source[i].idZonaPadre == 0) {
        target[cont] = source[i];
        cont++;
      }
    }

    let result: NodoZona[] = [];
    result[0] = new NodoZona();
    result[0].id = 0;
    result[0].descripcion = 'SIP';
    result[0].idZonaPadre = -1;
    result[0].tipoZona = -1;
    result[0].sons = [];

    for (var i = 0, max = target.length; i < max; i += 1) {
      result[0].sons.push(target[i]);
    }
    return result;
  }

  flatToTreeByLevel(source: NodoZona[]): NodoZona[] {
    let niveles0: any[] = [];
    let niveles1: any[] = [];
    let niveles2: any[] = [];

    for (var i = 0, max = source.length; i < max; i += 1) {
      source[i].descTipoZona = this.renderTipoZona(source[i].tipoZona);

      if (source[i].sons == null) {
        let sons: NodoZona[] = [];
        source[i].sons = sons;
      }

      if (source[i].nivel == 0) {
        source[i].idZonaPadre = -4;
        niveles0.push(source[i]);
      } else if (source[i].nivel == 1) {
        source[i].idZonaPadre = -2;
        niveles1.push(source[i]);
      } else if (source[i].nivel == 2) {
        source[i].idZonaPadre = -3;
        niveles2.push(source[i]);
      }
    }

    let target: NodoZona[] = [];

    target[0] = new NodoZona();
    target[0].id = -4;
    target[0].idZonaPadre = 0;
    target[0].descripcion = 'NIVEL-2';
    target[0].isSensor = 0;
    target[0].sons = niveles2;
    target[0].isSensor = null;

    target[1] = new NodoZona();
    target[1].id = -2;
    target[1].idZonaPadre = 0;
    target[1].descripcion = 'NIVEL-1';
    target[1].isSensor = 0;
    target[1].sons = niveles1;
    target[1].isSensor = null;

    target[2] = new NodoZona();
    target[2].id = -3;
    target[2].idZonaPadre = 0;
    target[2].descripcion = 'NIVEL-0';
    target[2].isSensor = 0;
    target[2].sons = niveles0;
    target[2].isSensor = null;

    let result: NodoZona[] = [];
    result[0] = new NodoZona();
    result[0].id = 0;
    result[0].descripcion = 'SIP';
    result[0].idZonaPadre = -1;
    result[0].tipoZona = -1;
    result[0].sons = [];
    result[0].isSensor = null;

    for (var i = 0, max = target.length; i < max; i += 1) {
      result[0].sons.push(target[i]);
    }
    return result;
  }

  renderTipoZona(key: number): string {
    /*
    GBtzNODORAIZ = 1
    GBtzGEOGRAFICA = 2
    GBtzEDIFICIO = 3
    GBtzZONA = 4
    */
    if (key == 1) return 'nodo';
    else if (key == 2) return 'geografica';
    else if (key == 3) return 'edificio';
    else if (key == 4) return 'zona';

    return 'zona';
  }
}
