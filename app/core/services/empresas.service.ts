import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

import swal from 'sweetalert2';
import { Empresa } from '../models/Empresa';

import { URL_ENDPOINT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private urlEndPoint = URL_ENDPOINT + '/empresas/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getEmpresas() {
    return this.http.get(this.urlEndPoint + '?_sort=nombre').pipe(map(response => response as Empresa[]));
  }

  getEmpresaById(id: number): Observable<Empresa> {
    console.log(`${this.urlEndPoint}${id}`);
    return this.http.get(`${this.urlEndPoint}${id}`).pipe(map(response => response as Empresa));
  }

  create(empresa: Empresa): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}`, empresa, { headers: this.httpHeaders }).pipe(
      map(res => {
        if (res != null) {
          swal.fire('Creación!', 'Empresa creada correctamente', 'success');
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

  update(empresa: Empresa): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}${empresa.id}`, empresa, { headers: this.httpHeaders }).pipe(
      map(res => {
        if (res != null) {
          swal.fire('¡Edición!', 'Empresa actualizada correctamente', 'success');
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

  delete(empresa: Empresa): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}${empresa.id}`).pipe(
      map(res => {
        if (res != null) {
          swal.fire('¡Borrado!', 'Empresa eliminada correctamente', 'success');
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
