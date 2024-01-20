import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService, private authService:AuthService, private router:Router){}

  form = new FormGroup({
    codigo : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
})
token:any;
ngOnInit(): void {
  this.authService.getToken().subscribe((res:String|null)=>{
    this.token =  res
  })
  
    if(this.authService.getToken()){
      this.userService.verificaLogado(this.token).subscribe((res)=>{
        this.router.navigate(['index'])
      },err=>{
        this.authService.removeToken()
      })
    }
}


  submit(){
    if (this.form.valid){
      this.userService.login(this.form.value).subscribe((res)=>{
        this.authService.storeToken(res.token)
        this.router.navigate(['index'])
      })
    }
  }
}
