// auth.service.ts

import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';


  constructor(private cookieService: CookieService) {}

  storeToken(token: string): void {
    this.removeToken()
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): string | null {
    const  storedToken = this.cookieService.get(this.tokenKey);
    if (storedToken) {
      // Se houver um token armazenado, você pode realizar verificações adicionais se necessário
      return storedToken;
    } else {
      return null;  
    }
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
}