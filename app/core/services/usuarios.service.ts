import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

import { URL_JSON_SERVER, URL_CENTOS } from '../config/config';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private urlEndPoint: string = URL_CENTOS + '/usuarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private usuario: Usuario[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(map(response => response as Usuario[]));
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios']);
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

  create(usuario: Usuario): Observable<any> {
    return this.http.post(this.urlEndPoint, usuario, { headers: this.httpHeaders }).pipe(
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

  update(usuario: Usuario): Observable<any> {
    //console.log(usuario);
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.login}`, usuario, { headers: this.httpHeaders }).pipe(
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

  borrarUsuario(usuario: Usuario) {
    const url = `${this.urlEndPoint}/${usuario.login}`;

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
