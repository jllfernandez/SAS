import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { LoginService } from '../services/login.service';
import { Usuario } from '../models/Usuario';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private _loginService: LoginService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    let usuario: Usuario = this._loginService.getLogin('login', context.username);

    if (usuario) {
      if (context.password === usuario.password) {
        const data = {
          username: 'admin', // sustituir por context.username en su momento
          token: '123456'
        };

        this.credentialsService.setCredentials(data, context.remember);
        return of(data);
      }
    }
    // valores seteados a guevo.
    const data = {
      username: 'admin', // sustituir por context.username en su momento
      token: '123456'
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
