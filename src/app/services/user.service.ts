import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delayWhen, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged = new EventEmitter<boolean>()
  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private cookieService: CookieService 
  ) { }

  login(data:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login/',data)
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.authService.getToken();

    if (!token) {
      return of(false); // Se não houver token, o usuário não está logado
    }

    return this.verificaLogado(token).pipe(
      map(() => true), // Se a verificação for bem-sucedida, o usuário está logado
      catchError(() => of(false)) // Se houver erro na verificação, consideramos que o usuário não está logado
    );
  }

  verificaLogado( token:string){
    return this.http.get('http://127.0.0.1:8000/api/user/',{headers:{'Authorization':` Token ${token} `}})
  }

  trazerDados(cod:any,token:string):Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/user/${cod}`,{headers:{'Authorization':` Token ${token}`}})
  }
}
