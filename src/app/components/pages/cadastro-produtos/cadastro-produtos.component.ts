import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../../../services/produtos.service';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent implements OnInit{
  constructor(
    private userService:UserService,
    private produtosService:ProdutosService,
    private authService:AuthService,
    private router:Router,
    private el: ElementRef,
    private renderer: Renderer2
  ){}
  produtos:any;
  searchTerm: string = '';

  form = new FormGroup({
    codigo : new FormControl(''),
    descricao : new FormControl('', Validators.required),
    comissao : new FormControl('', Validators.required),
    estoque_min : new FormControl('', Validators.required),
    ncm_sh : new FormControl('', Validators.required),
    unidade : new FormControl('', Validators.required),
    cest : new FormControl('', Validators.required),
    grupo : new FormControl('', Validators.required),
    ativo : new FormControl(false, Validators.required),
    cfop : new FormControl('', Validators.required),
    canp : new FormControl('', Validators.required),
    origem : new FormControl('', Validators.required),
    cst_icms : new FormControl('', Validators.required),
    per_icms : new FormControl('', Validators.required),
    cst_pis : new FormControl('', Validators.required),
    cofins : new FormControl('', Validators.required),
    per_pis : new FormControl('', Validators.required),
    per_cofins : new FormControl('', Validators.required),
    cst_atual : new FormControl('', Validators.required),
    per_atual : new FormControl('', Validators.required),
    preco_atual : new FormControl('', Validators.required),
    cst_antigo : new FormControl('', Validators.required),
    per_antigo : new FormControl('', Validators.required),
    preco_antigo : new FormControl('', Validators.required),
    estoque_pista : new FormControl('', Validators.required),
    estoque_interno : new FormControl('', Validators.required),
    ajuste : new FormControl('', Validators.required),
    ean13_input : new FormControl('',Validators.required)
  })
  

  ngOnInit(): void {
    this.form.controls.codigo.disable()
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

      this.produtosService.produtos().subscribe((res)=>{
        this.produtos = res
      })
  }

  filtrarLinhas(): void {
    let linhas = document.querySelectorAll("#tabela tbody tr");

    linhas.forEach((linha: any) => {
      var descricao = linha.querySelector('td:nth-child(2)').textContent.toLowerCase();

      if (descricao.includes(this.searchTerm.toLowerCase()) || this.searchTerm === '') {
        // If the description contains the search term or the term is empty, display the row
        linha.style.display = '';
      } else {
        // Hide the row if the description does not contain the search term
        linha.style.display = 'none';
      }
    });
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

  adicionarNaTabela(event:any):void{
    const tbody = this.el.nativeElement.querySelector('#tableEan13 table tbody');
    const trs = this.el.nativeElement.querySelectorAll('#tableEan13 table  tr');
    const ean13inp = this.el.nativeElement.querySelector('#ean13');
    if (tbody) {
      const tr = this.renderer.createElement('tr');
      const td = this.renderer.createElement('td');
      const del = this.renderer.createElement('td');
      const delButton = this.renderer.createElement('button');
      const ean13Input = this.form.get('ean13_input');

      if (ean13Input && ean13Input.valid) {
        const textNode = this.renderer.createText(ean13Input.value!);
        const buttonText = this.renderer.createText('Deletar');
        this.renderer.appendChild(td, textNode);
        this.renderer.appendChild(delButton, buttonText);
        this.renderer.appendChild(del, delButton);
        this.renderer.setAttribute(tr,'id',trs.length+1)
        this.renderer.appendChild(tr, td);
        this.renderer.appendChild(tr, del);
        this.renderer.appendChild(tbody, tr);
        ean13Input.setValue('')
        ean13inp.focus()
        delButton.addEventListener('click',()=>{
          this.deletarLinha(tr);
        })
      }
      ean13inp.focus()
    }  
  }

  deletarLinha(tr:HTMLElement){
    const tbody = this.el.nativeElement.querySelector('#tableEan13 table tbody');
    this.renderer.removeChild(tbody,tr)
  }

  passarValores(){
    const cst_atual = this.form.get('cst_atual')
    const cst_atual_inp = this.el.nativeElement.querySelector('#custoAtual')
    const per_atual = this.form.get('per_atual')
    const preco_atual = this.form.get('preco_atual')
    const cst_antigo = this.form.get('cst_antigo')
    const per_antigo = this.form.get('per_antigo')
    const preco_antigo = this.form.get('preco_antigo')

    if(cst_atual!.valid &&per_atual!.valid &&preco_atual!.valid){
      cst_antigo?.setValue(cst_atual!.value)
      cst_atual?.setValue('')
      per_antigo?.setValue(per_atual!.value)
      per_atual?.setValue('')
      preco_antigo?.setValue(preco_atual!.value)
      preco_atual?.setValue('')
    }
    cst_atual_inp.focus()
  }

  alterarInps(){
    this.form.get('codigo')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .codigo').textContent)
    this.form.get('descricao')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .desc').textContent)
    this.form.get('comissao')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .comissao').textContent)
    this.form.get('estoque_min')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .estoque_min').textContent)
    this.form.get('unidade')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .unidade').textContent)
    this.form.get('cest')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .cest').textContent)
    this.form.get('grupo')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .grupo').textContent)
    const ativoValue = this.el.nativeElement.querySelector('.linha-selecionada .ativo').textContent;
    const ativoCheckbox = this.form.get('ativo');
    if (ativoValue === 'True') {
      ativoCheckbox?.setValue(true);
    } else {
      ativoCheckbox?.setValue(false);
    }
    this.form.get('cfop')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .cfop').textContent)
    this.form.get('canp')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .anp').textContent)
    this.form.get('origem')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .origem').textContent)
    this.form.get('cst_icms')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .icms').textContent)
    this.form.get('per_icms')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .per_icms').textContent)
    this.form.get('cst_pis')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .pis').textContent)
    this.form.get('cofins')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .cofins').textContent)
    this.form.get('per_pis')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .per_pis').textContent)
    this.form.get('per_cofins')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .per_cofins').textContent)
    this.form.get('cst_atual')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .cst_atual').textContent)
    this.form.get('per_atual')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .per_atual').textContent)
    this.form.get('preco_atual')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .vl_atual').textContent)
    this.form.get('cst_antigo')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .cst_antigo').textContent)
    this.form.get('per_antigo')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .per_antigo').textContent)
    this.form.get('preco_antigo')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .vl_antigo').textContent)
    this.form.get('estoque_pista')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .estoque_pista').textContent)
    this.form.get('estoque_interno')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .estoque_interno').textContent)
    this.form.get('ajuste')?.setValue(this.el.nativeElement.querySelector('.linha-selecionada .ajuste').textContent)

    this.el.nativeElement.querySelector('#InserirButton').style.display = 'none'
    this.el.nativeElement.querySelector('#AlterarButton').style.display = 'none'
    this.el.nativeElement.querySelector('#ExcluirButton').style.display = 'none'
    this.el.nativeElement.querySelector('#Confirmar').style.display = 'flex'
    this.el.nativeElement.querySelector('#Cancelar').style.display = 'flex'

    this.produtosService.recuperrarEan13(Number(this.form.get('codigo')!.value)).subscribe((res)=>{
    const tbody = this.el.nativeElement.querySelector('#tableEan13 table tbody')
      for (let i = 0; i < res['ean13_list'].length; i++) {
        let tr = this.renderer.createElement('tr')
        let texto = this.renderer.createText(res['ean13_list'][i])
        let td = this.renderer.createElement('td')
        let buttonText = this.renderer.createText('Deletar');
        let del = this.renderer.createElement('td');
        let delButton = this.renderer.createElement('button');
        this.renderer.appendChild(delButton, buttonText);
        this.renderer.appendChild(del, delButton);
        this.renderer.appendChild(td,texto)
        this.renderer.appendChild(tr,td)
        this.renderer.appendChild(tr, del);
        this.renderer.appendChild(tbody,tr)
        delButton.addEventListener('click',()=>{
          this.deletarLinha(tr);
        })
      }
    })
  }

  alteraCancela(){
    this.el.nativeElement.querySelector('#InserirButton').style.display = 'flex'
    this.el.nativeElement.querySelector('#AlterarButton').style.display = 'flex'
    this.el.nativeElement.querySelector('#ExcluirButton').style.display = 'flex'
    this.el.nativeElement.querySelector('#Confirmar').style.display = 'none'
    this.el.nativeElement.querySelector('#Cancelar').style.display = 'none'

    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);
      if (control) {
        control.setValue('');
      }
    });

    const trs = this.el.nativeElement.querySelectorAll('#tableEan13 table tbody tr');
    const tbody = this.el.nativeElement.querySelector('#tableEan13 table tbody');

    trs.forEach((tr:HTMLElement) => {
      tbody.removeChild(tr);
    });
  }

  removerProduto(){
    const linha = this.el.nativeElement.querySelector('.linha-selecionada')
    const td = this.el.nativeElement.querySelector('.linha-selecionada .codigo')
    this.produtosService.deletar(td.textContent).subscribe({
      next:(res)=>{
        const tbody = this.el.nativeElement.querySelector('#tabela tbody');
        this.renderer.removeChild(tbody,linha)
      },
      error:(err)=>{console.log(err)}
    })
  }

  inserirProduto(){
    this.userService.verificaLogado(this.authService.getToken()!).subscribe({
      next:(res)=>{
        let infos = JSON.parse(JSON.stringify(res))
        infos = JSON.parse(infos['data'])
        let codigo = infos[0].fields.codigo
        console.log(this.form.value)
        let data = []
        //fazer verificação se os inputs tem valor
        let produto =
        {
          ID_PRODUTO:this.form.controls.codigo.value,
          DESC_PRODUTO:this.form.controls.descricao.value,
          FK_ID_UNIDADE:this.form.controls.unidade.value,
          FK_ID_GRUPO:this.form.controls.grupo.value,
          COMISSAO:this.form.controls.comissao.value,
          CT_ATUAL:this.form.controls.cst_atual.value,
          PC_ATUAL:this.form.controls.per_atual.value,
          VL_ATUAL:this.form.controls.preco_atual.value,
          CT_ANTIGO:this.form.controls.cst_antigo.value,
          PC_ANTIGO:this.form.controls.per_antigo.value,
          VL_ANTIGO:this.form.controls.preco_antigo.value,
          ESTOQUE_PISTA:this.form.controls.estoque_pista.value,
          ESTOQUE_INTERNO:this.form.controls.estoque_interno.value,
          ESTOQUE_MIN:this.form.controls.estoque_min.value,
          AJUSTE:this.form.controls.ajuste.value,
          ALIQUOTA:'ff',//não sei
          NCM:this.form.controls.ncm_sh.value,
          FK_ID_ORIGEM:this.form.controls.origem.value,
          FK_ID_CFOP:this.form.controls.cfop.value,
          FK_ID_ICMS:this.form.controls.cst_icms.value,
          PER_ICMS:this.form.controls.per_icms.value,
          FK_ID_PIS:this.form.controls.cst_pis.value,
          PER_PIS:this.form.controls.per_pis.value,
          FK_ID_COFINS:this.form.controls.cofins.value,
          PER_COFINS:this.form.controls.per_cofins.value,
          PER_PIS_ST:0,//não sei
          PER_COFINS_ST:0,//não sei
          CEST:this.form.controls.cest.value,
          CODIGO_ANP:this.form.controls.canp.value,
          FL_ATIVO:this.form.controls.ativo.value,
          LG_USUARIO:codigo,
        }

        let linhas = this.el.nativeElement.querySelectorAll('#tableEan13 table tbody tr');
        let ean13Array:any = [];
        //fazer verificação se tem alguma ean na tabela
        linhas.forEach((linha:any) => {
          let ean13Obj: { [key: string]: string } = {};
          let colunas = linha.querySelectorAll('td');

          colunas.forEach((coluna:any, index:any) => {
            if(index == 0){
              ean13Obj[`codigoEan`] = coluna.textContent.trim();
            }
          }); 

          ean13Array.push(ean13Obj);
        });

        data.push(produto)
        data.push(ean13Array)
        this.produtosService.adcionar(data).subscribe((res)=>{
          let infos = JSON.parse(JSON.stringify(res))
          infos = JSON.parse(infos['data'])
          console.log(infos[0].pk)
          infos[0].fields.ID_PRODUTO = infos[0].pk
          this.produtos.push(infos[0].fields)
          this.alteraCancela()
        })
      },
      error:()=>{
        this.userService.logged.emit(false)
        this.router.navigate([''])
        return
      }
    })
    
    
  }

  alterarProduto(){
    console.log('apertou')
    this.userService.verificaLogado(this.authService.getToken()!).subscribe({
      next:(res)=>{
        let infos = JSON.parse(JSON.stringify(res))
        infos = JSON.parse(infos['data'])
        let codigo = infos[0].fields.codigo
        let data = []
        //fazer verificação se os inputs tem valor
        let produto =
        {
          ID_PRODUTO:this.form.controls.codigo.value,
          DESC_PRODUTO:this.form.controls.descricao.value,
          FK_ID_UNIDADE:this.form.controls.unidade.value,
          FK_ID_GRUPO:this.form.controls.grupo.value,
          COMISSAO:this.form.controls.comissao.value,
          CT_ATUAL:this.form.controls.cst_atual.value,
          PC_ATUAL:this.form.controls.per_atual.value,
          VL_ATUAL:this.form.controls.preco_atual.value,
          CT_ANTIGO:this.form.controls.cst_antigo.value,
          PC_ANTIGO:this.form.controls.per_antigo.value,
          VL_ANTIGO:this.form.controls.preco_antigo.value,
          ESTOQUE_PISTA:this.form.controls.estoque_pista.value,
          ESTOQUE_INTERNO:this.form.controls.estoque_interno.value,
          ESTOQUE_MIN:this.form.controls.estoque_min.value,
          AJUSTE:this.form.controls.ajuste.value,
          ALIQUOTA:'ff',//não sei
          NCM:this.form.controls.ncm_sh.value,
          FK_ID_ORIGEM:this.form.controls.origem.value,
          FK_ID_CFOP:this.form.controls.cfop.value,
          FK_ID_ICMS:this.form.controls.cst_icms.value,
          PER_ICMS:this.form.controls.per_icms.value,
          FK_ID_PIS:this.form.controls.cst_pis.value,
          PER_PIS:this.form.controls.per_pis.value,
          FK_ID_COFINS:this.form.controls.cofins.value,
          PER_COFINS:this.form.controls.per_cofins.value,
          PER_PIS_ST:0,//não sei
          PER_COFINS_ST:0,//não sei
          CEST:this.form.controls.cest.value,
          CODIGO_ANP:this.form.controls.canp.value,
          FL_ATIVO:this.form.controls.ativo.value,
          LG_USUARIO:codigo,
        }

        let linhas = this.el.nativeElement.querySelectorAll('#tableEan13 table tbody tr');
        let ean13Array:any = [];
        //fazer verificação se tem alguma ean na tabela
        linhas.forEach((linha:any) => {
          let ean13Obj: { [key: string]: string } = {};
          let colunas = linha.querySelectorAll('td');

          colunas.forEach((coluna:any, index:any) => {
            if(index == 0){
              ean13Obj[`codigoEan`] = coluna.textContent.trim();
            }
          }); 

          ean13Array.push(ean13Obj);
        });

        data.push(produto)
        data.push(ean13Array)
        this.produtosService.atualizar(data,Number(produto.ID_PRODUTO)).subscribe((res)=>{
          let tbody = this.el.nativeElement.querySelector('#tabela tbody')
          let linha = this.el.nativeElement.querySelector('#tabela tbody .linha-selecionada')
          this.renderer.removeChild(tbody,linha)
          let infos = JSON.parse(JSON.stringify(res))
          infos = JSON.parse(infos['data'])
          infos[0].fields.ID_PRODUTO = infos[0].pk
          this.produtos.push(infos[0].fields)
          this.produtos.sort((a:any, b:any) => a.ID_PRODUTO - b.ID_PRODUTO);
          this.alteraCancela()
        })
      },
      error:()=>{
        this.userService.logged.emit(false)
        this.router.navigate([''])
        return
      }
    })
  }
}
