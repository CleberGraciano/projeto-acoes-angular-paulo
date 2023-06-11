import { Component, OnInit } from '@angular/core';
import { Acao } from '../acoes';
import { Router, ActivatedRoute } from '@angular/router';
import { AcoesService } from '../../acoes.service';

@Component({
  selector: 'app-acoes-form',
  templateUrl: './acoes-form.component.html',
  styleUrls: ['./acoes-form.component.css']
})
export class AcoesFormComponent implements OnInit {

  acao: Acao;
  success : boolean = false;
  errors: String[] = [];
  id: number = 0;
  titulo: string = 'Minhas Ações';
  msg: string = 'Ação Salva com sucesso!!'
  
  
  constructor(private service: AcoesService, private router: Router, private activatedRoute:ActivatedRoute) { 

    this.acao = new Acao();

    
  }

  recebeMensagem (respostaSucesso : string) {
    console.log('Foi emitido o evento e chegou no pai >>>> ', respostaSucesso);
  }


  ngOnInit() {
    
   let params = this.activatedRoute.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       if(this.id){
        this.service
        .getAcaoById(this.id)
        .subscribe(response=> this.acao = response,
          errorResponse => this.acao = new Acao()
          )
       }
       
     });

    }


  voltarParaListagem(){
    this.router.navigate(['/acoes/lista']);


  }

  onSubmit(){

    if(this.id){
      this.service
      .atualizar(this.acao)
      .subscribe(response => {
        this.success = true;
        this.errors = [];
      }, errorResponse => {
        this.errors = ['Erro ao atualizar a Ação.']
      
      })


    }else {

    this.service.salvar(this.acao).subscribe(response => {
      this.success = true;
      this.errors = [];
      this.acao = response;
    }, (errorResponse) =>{
      this.success = false;
      this.errors = errorResponse.error.errors;
      
    }
 
    )
  }
  }


}
