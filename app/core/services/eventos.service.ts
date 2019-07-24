import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import swal from 'sweetalert2';

import { Generic } from '../models/Generic';
import { Evento } from '../models/Evento';
import { URL_ENUMERADOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private url = '/servidoresEventos';

  constructor(private http: HttpService, private router: Router) {}

  getEstados(): Observable<any[]> {
    return this.http.getEnumerados('/TESTSENSOR/valores').pipe(map(response => response as any[]));
  }

  getAnalizadores(): Observable<any[]> {
    return this.http.getItems('/analizadores/?_sort=nombre').pipe(map(response => response as any[]));
  }

  create(evento: Evento): Observable<Generic> {
    return this.http.create(this.url, evento).pipe(
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

  update(evento: Evento): Observable<Generic> {
    return this.http.update(this.url, evento).pipe(
      map(response => {
        console.log(response);
        swal.fire('¡Actualizado!', 'Servidor de Evento modificado correctamente', 'success');
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
}
