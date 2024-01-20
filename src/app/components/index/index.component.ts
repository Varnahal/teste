import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  constructor(private userService:UserService, private authService:AuthService, private router:Router){}
  nome!:String;
  infos!:any;
  token:any;
  ngOnInit(): void {
    this.authService.getToken().subscribe((res:String|null)=>{
      this.token =  res
      if (!res) {
        this.router.navigate(['']);
      }
    });
    
      

    this.userService.verificaLogado(this.token).subscribe((res)=>{
      this.infos = JSON.parse(res.data)
      this.nome = this.infos[0].fields.codigo
    },err=>{
      this.router.navigate([''])
    })
}
}
