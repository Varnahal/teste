import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { CompraProdutosComponent } from './components/pages/compra-produtos/compra-produtos.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'index',component:IndexComponent},
  {path:'cadastro/produtos',component:CadastroProdutosComponent},
  {path:'controle/compra-produtos',component:CompraProdutosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
