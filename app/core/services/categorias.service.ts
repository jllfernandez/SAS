import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

import { Categoria } from '../models/Categoria';

import { URL_ENDPOINT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  //private urlEndPoint: string = 'http://localhost:3000/SIPCATEGORIAS';

  private urlEndPoint: string = URL_ENDPOINT + '/categorias';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get(this.urlEndPoint).pipe(map(response => response as Categoria[]));
  }

  create(categoria: Categoria): Observable<Categoria> {
    let cat: Categoria = categoria;
    cat.id = null;
    return this.http.post(this.urlEndPoint, cat, { headers: this.httpHeaders }).pipe(
      map((response: any) => response as Categoria),
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

  delete(categoria: number): Observable<Object> {
    let url = `${this.urlEndPoint}/${categoria}`;
    console.log(url);
    return this.http.delete(url, { headers: this.httpHeaders }).pipe(
      resp => {
        console.log(resp);
        swal.fire('Categoria borrada', ' Categoria ha sido eliminada correctamente', 'success');
        return resp;
      },
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(categoria: Categoria) {
    let url = this.urlEndPoint + '/' + categoria.id;

    return this.http.put(url, categoria).pipe(
      resp => {
        swal.fire('Categoria Actualizada', categoria.descripcion, 'success');
        return resp;
      },
      catchError(e => {
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
