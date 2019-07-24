import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

import { URL_JSON_SERVER, URL_CENTOS } from '../config/config';

import { Router } from '@angular/router';
import { AnalizadorEvento } from '../models/AnalizadorEvento';

@Injectable({
  providedIn: 'root'
})
export class AnalizadorEventosService {
  private urlEndPoint: string = URL_CENTOS + '/analizadores';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private analizador: AnalizadorEvento[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getAnalizador(id: number): Observable<AnalizadorEvento> {
    return this.http.get<AnalizadorEvento>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al obtener el usuario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getUsuariosFiltradoPor(campo: string, valor: string) {
    return this.http
      .get(this.urlEndPoint + '?' + campo + '_like=' + valor)
      .pipe(map(response => response as Usuario[]));
  }

  getUsuariosFilter(termino: string): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + '/?q=' + termino).pipe(map(response => response as Usuario[]));
  }

  getUsuariosLoginFilter(termino: string): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + '/?login_like=' + termino).pipe(map(response => response as Usuario[]));
  }

  getUsuariosPaged(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/?_page=${page}`).pipe(
      map((response: any) => {
        (response.content as Usuario[]).map(usuario => {
          return usuario;
        });
        return response.content as Usuario[];
      })
    );
  }

  create(analizador: AnalizadorEvento): Observable<any> {
    return this.http.post(this.urlEndPoint, analizador, { headers: this.httpHeaders }).pipe(
      response => {
        return response;
      },
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(analizador: AnalizadorEvento): Observable<any> {
    return this.http
      .put<AnalizadorEvento>(`${this.urlEndPoint}/${analizador.idanaliza}`, analizador, { headers: this.httpHeaders })
      .pipe(
        response => {
          return response;
        },
        catchError(e => {
          if (e.status === 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(analizador: AnalizadorEvento) {
    const url = `${this.urlEndPoint}/${analizador.idanaliza}`;

    return this.http.delete(url, { headers: this.httpHeaders }).pipe(
      response => {
        return response;
      },
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
