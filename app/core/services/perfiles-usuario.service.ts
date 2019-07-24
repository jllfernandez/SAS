import { Injectable } from '@angular/core';
import { URL_ENDPOINT } from '../config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PerfilesUsuario } from '../models/PerfilesUsuario';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilesUsuarioService {
  private urlEndPoint = URL_ENDPOINT + '/perfilesUsuario/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getPerfilesUsuario() {
    return this.http.get(this.urlEndPoint).pipe(map(response => response as PerfilesUsuario[]));
  }

  update(perfil: PerfilesUsuario): Observable<PerfilesUsuario> {
    console.log(this.urlEndPoint + perfil.nombre);
    console.log(perfil);
    return this.http.put<PerfilesUsuario>(this.urlEndPoint + perfil.nombre, perfil, { headers: this.httpHeaders });
  }
}
