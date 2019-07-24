import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

import swal from 'sweetalert2';
import { Portador } from '../models/Portador';

import { URL_ENDPOINT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PortadoresService {
  private urlEndPoint = URL_ENDPOINT + '/portadores/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getPortadores() {
    return this.http.get(this.urlEndPoint).pipe(map(response => response as Portador[]));
  }

  getPortadorById(id: number): Observable<Portador> {
    console.log(`${this.urlEndPoint}${id}`);
    return this.http.get(`${this.urlEndPoint}${id}`).pipe(map(response => response as Portador));
  }

  getPortadoresByParams(queryParams: HttpParams): Observable<any> {
    console.log(queryParams);
    return this.http.get(this.urlEndPoint, { params: queryParams });
  }

  create(portador: Portador): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}`, portador, { headers: this.httpHeaders }).pipe(
      map(res => {
        if (res != null) {
          swal.fire('Creación!', 'Portador creado correctamente', 'success');
        }
      }),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }

        swal.fire(e.error.message, e.error.status, 'error');
        return throwError(e);
      })
    );
  }

  update(portador: Portador): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}${portador.id}`, portador, { headers: this.httpHeaders }).pipe(
      map(res => {
        if (res != null) {
          swal.fire('¡Edición!', 'Portador actualizado correctamente', 'success');
        }
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

  delete(portador: Portador): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}${portador.id}`).pipe(
      map(res => {
        if (res != null) {
          swal.fire('¡Borrado!', 'Portador eliminado correctamente', 'success');
        }
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
}
