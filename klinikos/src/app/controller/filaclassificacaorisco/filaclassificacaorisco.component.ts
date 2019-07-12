import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FilaClassificacaoRiscoService } from './filaclassificacaorisco.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import * as Toastr from 'toastr';
import { Return } from 'src/app/model/Return';
import { Especialidade } from 'src/app/model/Especialidade';
import * as moment from 'moment';
import { AcolhimentoService } from '../acolhimento/acolhimento.service';
import { FilaRegistroService } from '../filaregistro/filaregistro.service';
import { FilaClassificacaoEvento } from 'src/app/model/FilaClassificacaoEvento';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-filaclassificacaorisco',
  templateUrl: './filaclassificacaorisco.component.html',
  styleUrls: ['./filaclassificacaorisco.component.css']
})
export class FilaclassificacaoriscoComponent implements OnInit {

  listaFila: Array<any> = [];
  listaPaginas: Array<any> = [];
  listaFilaClassificacao: any;
  listaEspecialidade: Array<Especialidade>;
  NumeroRegistrosGrid: any;
  totalPaginas: any;
  inicioGrid: any;
  finalGrid: any;
  paginaAtual: any;
  searchText: any;
  Profissional : PessoaProfissional;
  idUltimaChamadaPainel: string;
  idUltimaChamadaCancelada: string;
  idUltimaChamadaConfirmado: string;

  constructor(private FilaClassificacaoRiscoService: FilaClassificacaoRiscoService, private auth: AuthGuard, private AcolhimentoService: AcolhimentoService,
    private FilaRegistroService: FilaRegistroService, private pessoaService: PessoaService) {

    Toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

   }

  ngOnInit() {

    this.inicioGrid = "0";
    this.NumeroRegistrosGrid = this.finalGrid = "10";
    this.paginaAtual = 1;

    let user = JSON.parse(localStorage.getItem('user'));
    this.pessoaService.ConsultaProfissional(user.userId).subscribe(async (data: Return) => {
     this.Profissional = data.result;

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar o profissional");
      console.log(`Error. ${error.message}.`);
    });

    $(document).ready(function () {
 

      document.title = 'Fila de Classificação | Klinikos';
      $("h3[class^=k-subheader__title]").html("Fila de Classificação");

      $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });

    });
    this.AcolhimentoService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    setTimeout( () => {
      this.ConsultaFila();
  }, 1000);
  }

  ConsultaFila(){

    this.listaFila = [];
    this.FilaClassificacaoRiscoService.BuscarFilaClassificacaoRisco().subscribe(async (data: Return) => {

      this.listaFilaClassificacao = data.result;
      this.onBindGrid(this.listaFilaClassificacao);

       if(this.listaFilaClassificacao.length === 1)
         Toastr.info("Fila atualizada");

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

  }

  
  onBindGrid(lista: any){

    var idlinha = 1;
    lista.sort((g, h) => 
    {
    if(g.dataEntradaFilaRegistro > h.dataEntradaFilaRegistro)
      return 1;
    if(g.dataEntradaFilaRegistro < h.dataEntradaFilaRegistro)
      return -1;
    return 0;
    }).forEach(itemFila => {

      let item = {
          idlinha: idlinha,
          nomepaciente: itemFila.registroBoletim.pessoaPaciente.nomeSocial != null? 
          itemFila.registroBoletim.pessoaPaciente.nomeSocial +' ['+itemFila.registroBoletim.pessoaPaciente.nomeCompleto+']':itemFila.registroBoletim.pessoaPaciente.nomeCompleto,
          especialidade: this.GetEspecialidade(itemFila.registroBoletim.especialidadeId),
          dataEntradaFilaClassificacao: moment(itemFila.dataEntradaFilaClassificacao).format("DD/MM/YYYY HH:mm"),
          tempoEspera: this.GetTempoEspera(itemFila.dataEntradaFilaClassificacao),
          filaClassificacaoId: itemFila.filaClassificacaoId,
          pessoaId: itemFila.registroBoletim.pessoaPaciente.pessoaId,
          peso: itemFila.acolhimento !== null? itemFila.acolhimento.peso !== null? itemFila.acolhimento.peso: '':'',
          altura: itemFila.acolhimento !== null? itemFila.acolhimento.altura !== null? itemFila.acolhimento.altura: '':'',
          imc: itemFila.acolhimento !== null? itemFila.acolhimento.imc !== null? itemFila.acolhimento.imc: '':'',
          temperatura: itemFila.acolhimento !== null? itemFila.acolhimento.temperatura !== null? itemFila.acolhimento.temperatura: '':'',
          pressaoArterialSistolica: itemFila.acolhimento !== null? itemFila.acolhimento.pressaoArterialSistolica !== null? itemFila.acolhimento.pressaoArterialSistolica: '':'',
          pressaoArterialDiastolica: itemFila.acolhimento !== null? itemFila.acolhimento.pressaoArterialDiastolica !== null? itemFila.acolhimento.pressaoArterialDiastolica: '':'',
          pulso: itemFila.acolhimento !== null? itemFila.acolhimento.pulso !== null? itemFila.acolhimento.pulso: '':'',
          frequenciaRespiratoria: itemFila.acolhimento !== null? itemFila.acolhimento.frequenciaRespiratoria !== null? itemFila.acolhimento.frequenciaRespiratoria: '':'',
          saturacao: itemFila.acolhimento !== null? itemFila.acolhimento.saturacao !== null? itemFila.acolhimento.saturacao: '':''
      };

     
      this.listaFila.push(item);
      idlinha++;
      
    
    });

    this.onBindPaginacao("inicial");

  }

  GetEspecialidade(especialidadeId: string){

    if(especialidadeId !=='00000000-0000-0000-0000-000000000000' )
    return this.listaEspecialidade.find(x=>x.especialidadeId === especialidadeId).descricao;
    return '';
  }



  GetTempoEspera(dataEntradaFilaClassificacao: Date){


    const hora = Math.round(moment(new Date()).diff(dataEntradaFilaClassificacao,'minutes') /60);
    const minutos = Math.round(moment(new Date()).diff(dataEntradaFilaClassificacao,'minutes') % 60);

    //  if(minutos > new Date().getMinutes())
    //   return (hora-1) +'h '+ minutos+ 'min';

    if(hora > 1)
    return hora +'h '+ minutos+ 'min';


    return minutos+ 'min';
  }

  onExibeDetalhes(index: any){

    if(!$("#btnDetalhes"+index).hasClass('oculta')){

          $(document).ready(function () { $("#btnDetalhes"+index).addClass("oculta");});
    }else{
      $(document).ready(function () { $("#btnDetalhes"+index).removeClass("oculta");});
    }
    
  }

  onBindPaginacao(value: any){

    if(value === "inicial"){
      if(Number(this.NumeroRegistrosGrid) < this.listaFila.length){
        $(document).ready(function () { $("#paginacaoGrid").removeClass("oculta");});

        this.listaPaginas = [];

        this.totalPaginas = Math.ceil(this.listaFila.length/ Number(this.NumeroRegistrosGrid));

        for(let i = 0; i <= (this.totalPaginas + 1); i++)

            if(i === 0)
              this.listaPaginas.push(["Anterior"]);
            else if (i === (this.totalPaginas + 1))
                this.listaPaginas.push(["Próximo"]);
            else
              this.listaPaginas.push(i);

             
      }

    }
  
    else if(value === "linhasexibicao"){

      if(Number(this.NumeroRegistrosGrid) > this.listaFila.length)
        $(document).ready(function () { $("#paginacaoGrid").addClass("oculta");});
      else
        $(document).ready(function () { $("#paginacaoGrid").removeClass("oculta");});

        this.listaPaginas = [];

        this.totalPaginas = Math.ceil(this.listaFila.length/ Number(this.NumeroRegistrosGrid));

        for(let i = 0; i <= (this.totalPaginas + 1); i++)

            if(i === 0)
              this.listaPaginas.push(["Anterior"]);
            else if (i === (this.totalPaginas + 1))
                this.listaPaginas.push(["Próximo"]);
            else
              this.listaPaginas.push(i);

      this.inicioGrid = 0;
      this.finalGrid = this.NumeroRegistrosGrid; 
      this.paginaAtual = 1;

      $(document).ready(function () {
        $(".page-item").removeClass("active");
        $("#1").addClass("active");
      });

    }else {
      var page = this;

        if(value == "Anterior"){

          if(page.paginaAtual > 2){
  
            page.paginaAtual--;
            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+(page.paginaAtual).toString()).addClass("active");
            });

            value = page.paginaAtual;
            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

          }else{

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#1").addClass("active");
            });
            page.paginaAtual = 1;
            this.inicioGrid = "0";
            this.finalGrid = this.NumeroRegistrosGrid;
           
          }

        }else if(value == "Próximo"){
          if(page.paginaAtual !== this.totalPaginas){

            page.paginaAtual++;

            value = page.paginaAtual;

            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+ value).addClass("active");

            });

            

          }
          }else{


            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#"+ (this.totalPaginas - 1)).addClass("active");

            });
          
          
          if(value !== 1){
            this.inicioGrid = (Number(this.NumeroRegistrosGrid) * (value - 1)).toString();
            this.finalGrid = (Number(this.inicioGrid) * value).toString();

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#" +value).addClass("active");

            });
            
          }else{
            
            this.inicioGrid = "0";
            this.finalGrid = this.NumeroRegistrosGrid;

            $(document).ready(function () {
              $(".page-item").removeClass("active");
              $("#1").addClass("active");

            });
          }

          this.paginaAtual = value;
        }

    }

  }


  
  onExibeBotoesPainel(index: any, tipo: any){

    var tipoBotao: any;
 
      if(!$("#icon_microfone"+index).hasClass('c-vermelho') && tipo === "chamada"){
        //realiza chamada
        $("#icon_microfone"+index).attr("class", "fas fa-microphone-alt-slash c-vermelho i-s1");
        $("#btnCancelarChamadaPainel"+index).removeClass('oculta');
        tipoBotao = "P";

      }else{
        //cancela chamada
        $("#icon_microfone"+index).attr("class", "fas fa-microphone-alt i-s1");
        $("#btnCancelarChamadaPainel"+index).addClass('oculta');
       
       if(tipo === "chamada")
          tipoBotao = "C";
        else
          tipoBotao = "O";
        
      
    }

      this.FilaRegistroService.ConsultarEvento(tipoBotao).subscribe(async (data: Return) => {
  
        if(data.result !== null){
  
          var date = new Date();
          var filaclassificacaoevento: FilaClassificacaoEvento = {
            FilaClassificacao: this.listaFila[index],
            dataFilaClassificacaoEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: data.result.eventoId,
            PessoaProfissional:  this.Profissional
        };
  
  
         this.FilaClassificacaoRiscoService.AdicionarFilaEvento(filaclassificacaoevento).subscribe(async (subdata: Return) => {


          if(tipoBotao === "P"){
            this.idUltimaChamadaPainel = subdata.result.filaRegistroEventosId;
            Toastr.info("Paciente "+this.listaFila[index].nomepaciente+" enviada ao Painel");
          }
         if(tipoBotao=== "C"){
            this.idUltimaChamadaCancelada = subdata.result.filaRegistroEventosId;
            Toastr.error("Paciente "+this.listaFila[index].nomepaciente+" cancelada");
          }
           if(tipoBotao=== "O"){
            this.idUltimaChamadaConfirmado = subdata.result.filaRegistroEventosId;
            Toastr.success("Paciente "+this.listaFila[index].nomepaciente+" confirmado");
          }
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    

        });
  
         }
     
        }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
  
      });


  
  }

  onEvasaoSemAtendimento(filaClassificacaoId: any){

    var page = this;

    swal({ title: 'Deseja realizar a saída da fila?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
    .then(function (result) {
      if (result.value) {
     
        page.onRetirarItemFila(filaClassificacaoId);
       

      }
    });


  }

  
  onRetirarItemFila(filaClassificacaoId: any) {

    var index = this.listaFila.findIndex(x => x.filaClassificacaoId === filaClassificacaoId);
    this.listaFila.splice(index, 1);

    var item = this.listaFilaClassificacao.find(x => x.filaClassificacaoId === filaClassificacaoId);
     item.ativo = false;

     this.FilaRegistroService.RetirarFila(item).subscribe(async (data: Return) => {



    //  this.FilaRegistroService.ConsultarEvento("R").subscribe(async (subdata: Return) => {

    //    if(subdata.result !== null){

    //      var date = new Date();
    //      var filaregistroevento: FilaRegistroEvento = {
    //        filaRegistro: item,
    //        dataFilaRegistroEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
    //        eventoId: subdata.result.eventoId,
    //        PessoaProfissional:  this.Profissional
    //    };


    //    this.FilaRegistroService.AdicionarFilaEvento(filaregistroevento).subscribe(async (subdata2: Return) => {
    //      this.itemRemovido = true;
    //      Toastr.success("Paciente retirado da fila");
    //    }, (error: HttpErrorResponse) => {
    //      this.auth.onSessaoInvalida(error);
   
    //    });


    //  }

    //    }, (error: HttpErrorResponse) => {
    //      this.auth.onSessaoInvalida(error);
   
    //    });

     
   }, (error: HttpErrorResponse) => {
     this.auth.onSessaoInvalida(error);

   });

 }

}
