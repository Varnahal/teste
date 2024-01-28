import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  constructor(private userService:UserService, private authService:AuthService, private router:Router,private cookieService: CookieService ){}
  nome!:String;
  infos!:any;
  token:any;
  ngOnInit(): void {
      const token = this.authService.getToken()
      this.userService.verificaLogado(token!).subscribe({
        next:(v)=>{
          this.infos = JSON.parse(JSON.stringify(v))
          this.infos = JSON.parse(this.infos['data'])
          this.nome = this.infos[0].fields.codigo
        },
        error:(e)=>{
          this.userService.logged.emit(false)
          this.router.navigate([''])
        }
      })
    
  }

}
