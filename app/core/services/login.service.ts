import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient, private _usuariosService: UsuariosService) {}

  getLogin(login: string, password: string): Usuario {
    this._usuariosService.getUsuariosFiltradoPor('login', login).forEach(user => {
      if (user) {
        return user;
      }
    });
    return null;
  }
}
