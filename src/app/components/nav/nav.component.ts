import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  logged:boolean = false;
  dados:any;
  name!:String;

  constructor(private userService:UserService, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.checkLoginStatus();

    // Subscreva ao evento de login para atualizar o estado quando o login ocorrer
    this.userService.logged.subscribe((status) => {
      this.logged = status;
      this.checkLoginStatus();
    });
          
  }

  private checkLoginStatus() {
    const token = this.authService.getToken()
    this.userService.verificaLogado(token!).subscribe(
      (v) => {
        this.dados = v
        this.dados = JSON.parse(JSON.stringify(v))
        this.dados = JSON.parse(this.dados['data'])
        this.name = this.dados[0].fields.codigo
        this.logged = true;
      },
      () => {
        this.logged = false;
      }
    );
  }
}
