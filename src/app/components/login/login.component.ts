import { Component, EventEmitter, OnInit } from '@angular/core';
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
  constructor(
    private userService:UserService,
    private authService:AuthService,
    private router:Router,

    ){}

  form = new FormGroup({
    codigo : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
})

ngOnInit(): void {
  // Verificar o estado de login antes de redirecionar
  const token = this.authService.getToken()
  this.userService.verificaLogado(token!).subscribe(
    () => {
      this.router.navigate(['index']);
    },
    (err) => {
      console.log(err);
    }
  );
}


  submit(){
    if (this.form.valid){
      this.userService.login(this.form.value).subscribe((res)=>{
        this.authService.storeToken(res.token)
        this.userService.logged.emit(true)
        this.router.navigate(['index'])
      })
    }
  }
}
