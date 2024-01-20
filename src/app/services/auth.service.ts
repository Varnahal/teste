// auth.service.ts

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private cookieService: CookieService) {}

  // ... (restante do código)

  storeToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): Observable<string | null> {
    const  storedToken =  this.cookieService.get(this.tokenKey);
    if (storedToken) {
      // Se houver um token armazenado, você pode realizar verificações adicionais se necessário
      return of(storedToken);
    } else {
      return of(null);
    }
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
}