import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(data:any):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/login/',data)
  }

  verificaLogado(token:any):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/user/',{headers:{'Authorization':` Token ${token}`}})
  }

  trazerDados(cod:any,token:string):Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/user/${cod}`,{headers:{'Authorization':` Token ${token}`}})
  }
}
