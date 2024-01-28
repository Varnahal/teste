import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http:HttpClient, private authService:AuthService,private cookieService: CookieService ) { }

  produtos():Observable<any>{
    const token = this.authService.getToken()
    return this.http.get(`http://127.0.0.1:8000/api/produtos/getAll/`,{headers:{'Authorization':` Token ${token}`}})
  }

  deletar(id:number):Observable<any>{
    const token = this.authService.getToken()
    return this.http.delete(`http://127.0.0.1:8000/api/produtos/delete/${id}`,{headers:{'Authorization':` Token ${token}`}})
  }

  adcionar(data:any):Observable<any>{
    const token = this.authService.getToken()
    return this.http.post(`http://127.0.0.1:8000/api/produtos/register`,data,{headers:{'Authorization':` Token ${token}`}})
  }

  atualizar(data:any,id:number):Observable<any>{
    const token = this.authService.getToken()
    return this.http.put(`http://127.0.0.1:8000/api/produtos/update/${id}`,data,{headers:{'Authorization':` Token ${token}`}})
  }

  recuperrarEan13(id:number):Observable<any>{
    const token = this.authService.getToken()
    return this.http.get(`http://127.0.0.1:8000/api/produtos/ena13/${id}`,{headers:{'Authorization':` Token ${token}`}})
  }
}
