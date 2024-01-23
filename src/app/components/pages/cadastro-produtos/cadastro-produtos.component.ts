import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent implements OnInit{
  constructor(private userService:UserService, private authService:AuthService, private router:Router,private el: ElementRef, private renderer: Renderer2){}
  produtos:any;

  ngOnInit(): void {
    const token = this.authService.getToken()
    this.userService.verificaLogado(token!).subscribe({
      next:(v)=>{
        //console.log(v)
      },
      error:(e)=>{
        this.userService.logged.emit(false)
        this.router.navigate([''])
      }
    })

      this.userService.produtos().subscribe((res)=>{
        this.produtos = res
        console.log(res)
      })
  }

  selecionaLinha(event: any): void {
    const linhas = this.el.nativeElement.querySelectorAll('.linhas');

    // Remova a classe de todas as linhas
    linhas.forEach((linha:any) => {
      this.renderer.removeClass(linha, 'linha-selecionada');
    });

    // Adicione a classe à linha clicada
    this.renderer.addClass(event.currentTarget, 'linha-selecionada');
  }
}
