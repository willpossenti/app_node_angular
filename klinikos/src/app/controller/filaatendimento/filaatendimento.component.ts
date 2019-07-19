import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AcolhimentoService } from '../acolhimento/acolhimento.service';
import { Return } from 'src/app/model/Return';
import { Especialidade } from 'src/app/model/Especialidade';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { FilaRegistroService } from '../filaregistro/filaregistro.service';
import { Preferencial } from 'src/app/model/Preferencial';
import { FilaAtendimentoService } from './filaatendimento.service';
import * as Toastr from 'toastr';
import * as moment from 'moment';
import { PessoaService } from '../cadastro/pessoa/pessoa.service';
import { Router } from '@angular/router';
import { FilaAtendimentoEvento } from 'src/app/model/FilaAtendimentoEvento';
import { PessoaProfissional } from 'src/app/model/PessoaProfissional';
import { PessoaStatus } from 'src/app/model/PessoaStatus';
import { ClassificaoRiscoService } from '../classificacaorisco/classificacaorisco.service';
import * as swal from '../../../assets/vendors/general/sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-filaatendimento',
  templateUrl: './filaatendimento.component.html',
  styleUrls: ['./filaatendimento.component.css']
})
export class FilaatendimentoComponent implements OnInit {

  listaFila: Array<any> = [];
  listaEspecialidade: Array<Especialidade>;
  listaPreferencial: Array<Preferencial>;
  listaPessoaStatus: Array<PessoaStatus>;
  listaFilaAtendimento: any;
  NumeroRegistrosGrid: any;
  listaPaginas: Array<any> = [];
  totalPaginas: any;
  inicioGrid: any;
  finalGrid: any;
  paginaAtual: any;
  searchText: any;
  Profissional : PessoaProfissional;
  dataUltimaRemocao: Date;
  dataUltimaChamadaPainel: Date;
  dataUltimaChamadaCancelada: Date;
  dataUltimaChamadaConfirmado: Date;
  idUltimaChamadaPainel: string;
  idUltimaChamadaCancelada: string;
  idUltimaChamadaConfirmado: string;
  itemRemovido: boolean;
  interval: any;

  constructor(private route: Router, private AcolhimentoService: AcolhimentoService, private ClassificaoRiscoService: ClassificaoRiscoService,
    private auth: AuthGuard, private FilaRegistroService: FilaRegistroService, 
    private FilaAtendimentoService: FilaAtendimentoService, private pessoaService: PessoaService) { 

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

    $(document).ready(function () {
 

      document.title = 'Fila de Atendimento | Klinikos';
      $("h3[class^=k-subheader__title]").html("Fila de Atendimento");

      $.getScript("../../../assets/app/custom/general/interface.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/vendors/custom/datatables/datatables.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/app/custom/general/components/datatables/extensions/responsive.js", function (data: any, textStatus: any, jqxhr: any) {
      });

      $.getScript("../../../assets/demo/default/base/scripts.bundle.js", function (data: any, textStatus: any, jqxhr: any) {
      });

    

    });


    
    let user = JSON.parse(localStorage.getItem('user'));
    this.pessoaService.ConsultaProfissional(user.userId).subscribe(async (data: Return) => {
     this.Profissional = data.result;

    }, (error: HttpErrorResponse) => {
      Toastr.error("Falha ao carregar o profissional");
      console.log(`Error. ${error.message}.`);
    });


    this.AcolhimentoService.BindEspecialidade().subscribe(async (data: Return) => {
      this.listaEspecialidade = data.result;

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.FilaRegistroService.BindPreferencial().subscribe(async (data: Return) => {
      this.listaPreferencial = data.result;
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    this.pessoaService.ConsultaPessoaStatus().subscribe(async (data: Return) => {
      this.listaPessoaStatus = data.result;
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

    setTimeout( () => {
      this.ConsultaFila();
  }, 1000);

  this.interval = setInterval(() => { 
    this.ConsultarNovosRegistros();
  }, 5000);

  }

  
  ConsultaFila(){
    this.listaFila = [];
    this.FilaAtendimentoService.BuscarFilaAtendimento().subscribe(async (data: Return) => {

      this.listaFilaAtendimento = data.result;
      this.onBindGrid(this.listaFilaAtendimento);

       if(this.listaFilaAtendimento.length === 1)
         Toastr.info("Fila atualizada");

    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });

  }

  
ConsultarNovosRegistros(){

  var filaAtendimentoEvento: FilaAtendimentoEvento = {};

      if(this.listaFilaAtendimento !== undefined){
        var filaAtendimento = this.listaFilaAtendimento.sort((a, b) =>  {
          if(a.dataEntradaFilaAtendimento > b.dataEntradaFilaAtendimento)
            return -1;
          if(a.dataEntradaFilaAtendimento < b.dataEntradaFilaAtendimento)
            return 1;
          return 0;
          })[0];

          filaAtendimentoEvento.FilaAtendimento = filaAtendimento;
        }


          this.FilaAtendimentoService.ConsultarRegistrosNovos(filaAtendimentoEvento).subscribe(async (data: Return) => {
  
          if(data.result !== null){
            if(data.result.filaAtendimento !== null){
                this.listaFila = [];
                this.listaFilaAtendimento.push(data.result.filaAtendimento);
                this.onBindGrid(this.listaFilaAtendimento);

                  Toastr.info("Fila atualizada");
            }
          } else {

          if(this.listaFilaAtendimento.length > 0){

            if(this.dataUltimaRemocao === undefined)
              filaAtendimentoEvento.dataFilaAtendimentoEvento = filaAtendimento.dataEntradaFilaAtendimento;
            else
              filaAtendimentoEvento.dataFilaAtendimentoEvento = this.dataUltimaRemocao;         
       


            this.FilaAtendimentoService.ConsultarRegistrosRetirados(filaAtendimentoEvento).subscribe(async (subdata: Return) => {
                  

                if(subdata.result !== null){
                  if(subdata.result.filaAtendimento !== null){

                    var index = this.listaFilaAtendimento.findIndex(x => x.filaAtendimentoId === subdata.result.filaAtendimento.filaAtendimentoId);

                    if(index >= 0){
          
                      this.listaFilaAtendimento.splice(index, 1);
                      this.listaFila = [];
                      this.onBindGrid(this.listaFilaAtendimento);
                      this.dataUltimaRemocao = subdata.result.dataFilaAtendimentoEvento;
        
                      if(!this.itemRemovido)
                        Toastr.info("Fila atualizada");
                    }
                  }
                }else{

                if(this.idUltimaChamadaPainel !== undefined)
                  filaAtendimentoEvento.filaAtendimentoEventoId = this.idUltimaChamadaPainel;

                if(this.dataUltimaChamadaPainel === undefined)
                  filaAtendimentoEvento.dataFilaAtendimentoEvento = filaAtendimento.dataEntradaFilaAtendimento;
                else{
                  filaAtendimentoEvento.dataFilaAtendimentoEvento = this.dataUltimaChamadaPainel;         
                  this.idUltimaChamadaPainel = filaAtendimentoEvento.filaAtendimentoEventoId;
                }

                      this.FilaAtendimentoService.ConsultarRegistrosChamadosAoPainel(filaAtendimentoEvento).subscribe(async (subdata2: Return) => {
                        console.log(subdata2.result);
                        if(subdata2.result !== null){
                          if(Number(moment(new Date()).diff(subdata2.result.dataFilaAtendimentoEvento,'minutes')) <= 5){
                            this.dataUltimaChamadaPainel = subdata2.result.dataFilaAtendimentoEvento;
                            this.idUltimaChamadaPainel = subdata2.result.filaAtendimentoEventoId;
                            Toastr.info("Paciente "+subdata2.result.filaAtendimento.classificacaoRisco.pessoaPaciente.nomeCompleto+" foi enviado ao Painel");
                          }
                        }else{

                          if(this.idUltimaChamadaCancelada !== undefined)
                            filaAtendimentoEvento.filaAtendimentoEventoId = this.idUltimaChamadaCancelada;
      
                          if(this.dataUltimaChamadaCancelada === undefined)
                            filaAtendimentoEvento.dataFilaAtendimentoEvento = filaAtendimento.dataEntradaFilaAtendimento;
                          else{
                            filaAtendimentoEvento.dataFilaAtendimentoEvento = this.dataUltimaChamadaCancelada;    
                            this.idUltimaChamadaCancelada = filaAtendimentoEvento.filaAtendimentoEventoId;
                          }

                          this.FilaAtendimentoService.ConsultarRegistrosCancelados(filaAtendimentoEvento).subscribe(async (subdata3: Return) => {

                            if(subdata3.result !== null){
                              if(Number(moment(new Date()).diff(subdata3.result.dataFilaAtendimentoEvento,'minutes')) <= 5){
                                this.dataUltimaChamadaCancelada = subdata3.result.dataFilaAtendimentoEvento;
                                this.idUltimaChamadaCancelada = subdata3.result.filaAtendimentoEventoId;
                                Toastr.error("Paciente "+subdata3.result.filaAtendimento.classificacaoRisco.pessoaPaciente.nomeCompleto+" foi cancelado");
                              }
                            }else{


                              if(this.idUltimaChamadaConfirmado !== undefined)
                                filaAtendimentoEvento.filaAtendimentoEventoId = this.idUltimaChamadaConfirmado;
          
                              if(this.dataUltimaChamadaConfirmado === undefined)
                                filaAtendimentoEvento.dataFilaAtendimentoEvento = filaAtendimento.dataEntradaFilaAtendimento;
                              else{
                                filaAtendimentoEvento.dataFilaAtendimentoEvento = this.dataUltimaChamadaConfirmado;    
                                this.idUltimaChamadaConfirmado = filaAtendimentoEvento.filaAtendimentoEventoId;
                              }

                              this.FilaAtendimentoService.ConsultarRegistrosConfirmados(filaAtendimentoEvento).subscribe(async (subdata4: Return) => {

                               
                                if(subdata4.result !== null){
                                  if(Number(moment(new Date()).diff(subdata4.result.dataFilaAtendimentoEvento,'minutes')) <= 5){

                                    this.dataUltimaChamadaConfirmado = subdata4.result.dataFilaAtendimentoEvento;
                                    this.idUltimaChamadaConfirmado = subdata4.result.filaAtendimentoEventoId;
                                    Toastr.success("Paciente "+subdata4.result.filaAtendimento.classificacaoRisco.pessoaPaciente.nomeCompleto+" foi confirmado");
                                  }
                                }


                              }, (error: HttpErrorResponse) => {
                                this.auth.onSessaoInvalida(error);
                            });


                            }


                          }, (error: HttpErrorResponse) => {
                            this.auth.onSessaoInvalida(error);
                        });

                        }
                      }, (error: HttpErrorResponse) => {
                        this.auth.onSessaoInvalida(error);
                    });
                    
                  }

                }, (error: HttpErrorResponse) => {
                  this.auth.onSessaoInvalida(error);
              });
            }
          }
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
        });


}

  onBindGrid(lista: any){

    var idlinha = 1;

      lista.sort((g, h) => 
        {
        if(g.dataEntradaFilaAtendimento > h.dataEntradaFilaAtendimento)
          return 1;
        if(g.dataEntradaFilaAtendimento < h.dataEntradaFilaAtendimento)
          return -1;
        return 0;
        }).sort((e, f) => 
        {
        if(e.idoso80 > f.idoso80)
          return -1;
        if(e.idoso80 < f.idoso80)
          return 1;
        return 0;
        })
        .sort((c, d) => 
        {
        if(c.preferencial > d.preferencial)
          return -1;
        if(c.preferencial < d.preferencial)
          return 1;
        return 0;
        }).sort((a, b) => 
        {
          if(a.acolhimento !== undefined){
        if(a.acolhimento.risco > b.acolhimento.risco)
          return -1;
        if(a.acolhimento.risco < b.acolhimento.risco)
          return 1;
        return 0; 
          }
        }).forEach(itemFila => {

          let item = {
            idlinha: idlinha,
            nomepaciente: itemFila.acolhimento.pessoaPaciente.nomeSocial != null? 
            itemFila.acolhimento.pessoaPaciente.nomeSocial +' ['+itemFila.acolhimento.pessoaPaciente.nomeCompleto+']':itemFila.acolhimento.pessoaPaciente.nomeCompleto,
            especialidade: this.GetEspecialidade(itemFila.acolhimento.especialidadeId),
            dataEntradaFilaAtendimento: moment(itemFila.dataEntradaFilaAtendimento).format("DD/MM/YYYY HH:mm"),
            tempoEspera: this.GetTempoEspera(itemFila.dataEntradaFilaAtendimento),
            filaAtendimentoId: itemFila.filaAtendimentoId,
            pessoaId: itemFila.acolhimento.pessoaPaciente.pessoaId,
            idoso80: itemFila.idoso80,
            preferencial: itemFila.preferencial,
            risco: itemFila.acolhimento.risco,
            descricaoPreferencial: this.GetPreferencial(itemFila.acolhimento.preferencialId),
            status: this.GetSiglaStatus(itemFila.acolhimento.pessoaPaciente.pessoaStatusId),
            classificacaoRiscoId: this.GetSiglaStatus(itemFila.classificacaoRisco.pessoaPaciente.pessoaStatusId),
            listaSinaisVitais: []
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

  GetPreferencial(preferencialId: string){
    if(preferencialId !=='00000000-0000-0000-0000-000000000000' )
         return this.listaPreferencial.find(x=>x.preferencialId === preferencialId).nome;
    return '';
        
  }

  GetSiglaStatus(pessoaStatusId: string){
    if(pessoaStatusId !=='00000000-0000-0000-0000-000000000000' )
         return this.listaPessoaStatus.find(x=>x.pessoaStatusId === pessoaStatusId).sigla;
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

  SelecionarPaciente(item: any){
    
    
    this.pessoaService.ConsultaPessoaStatusNome("CR").subscribe(data => {
  
      if(data.result !== null){
       var pessoa = this.listaFilaAtendimento.find(x=>x.classificacaoRisco.pessoaPaciente.pessoaId === item.pessoaId).classificacaoRisco.pessoaPaciente;
        pessoa.pessoaStatusId = data.result.pessoaStatusId;
  
       this.pessoaService.AlterarPessoaPaciente(pessoa).subscribe(subdata => {
  
  
      }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
      });
       
    }
    }, (error: HttpErrorResponse) => {
      this.auth.onSessaoInvalida(error);
    });
      
     this.route.navigate(['klinikos/atendimentomedico'], {queryParams: {filaAtendimentoId: item.filaAtendimentoId}});
  
  
  
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

          var filaAtendimento = this.listaFilaAtendimento.find(x=>x.filaAtendimentoId === this.listaFila[index].filaAtendimentoId);

          filaAtendimento.acolhimento = null;
          filaAtendimento.classificacaoRisco = null;

          var date = new Date();
          var filaatendimentoevento: FilaAtendimentoEvento = {
            FilaAtendimento: filaAtendimento,
            dataFilaAtendimentoEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: data.result.eventoId,
            PessoaProfissional:  this.Profissional
        };
  

         this.FilaAtendimentoService.AdicionarFilaEvento(filaatendimentoevento).subscribe(async (subdata: Return) => {


          if(tipoBotao === "P"){
            this.idUltimaChamadaPainel = subdata.result.filaAtendimentoEventoId;
            Toastr.info("Paciente "+this.listaFila[index].nomepaciente+" enviada ao Painel");
          }
         if(tipoBotao=== "C"){
            this.idUltimaChamadaCancelada = subdata.result.filaAtendimentoEventoId;
            Toastr.error("Paciente "+this.listaFila[index].nomepaciente+" cancelada");
          }
           if(tipoBotao=== "O"){
            this.idUltimaChamadaConfirmado = subdata.result.filaAtendimentoEventoId;
            Toastr.success("Paciente "+this.listaFila[index].nomepaciente+" confirmado");

            var filaClassificacao = this.listaFila[index];
            this.SelecionarPaciente(filaClassificacao);
          }
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    

        });
  
         }
     
        }, (error: HttpErrorResponse) => {
        this.auth.onSessaoInvalida(error);
  
      });


  
  }

  onExibeDetalhes(index: any){

    if(!$("#btnDetalhes"+index).hasClass('oculta')){
      $(document).ready(function () { $("#btnDetalhes"+index).addClass("oculta");  $("#icon_detalhes"+index).attr("class", "la la-plus-circle i-s2"); });
    }else{
      $(document).ready(function () { $("#btnDetalhes"+index).removeClass("oculta"); $("#icon_detalhes"+index).attr("class", "la la-minus-circle i-s2");});
    }
    var pessoa = this.listaFila[index].pessoaId;
    this.onAtendimentoDetalhes(pessoa, index);
    
  }

        
 onAtendimentoDetalhes(pessoaId: string, index: any){

this.listaFila[index].listaSinaisVitais = [];

this.AcolhimentoService.ConsultaAcolhimentoPorPessoaId(pessoaId).subscribe(async (data: Return) => {

data.result.forEach(itemFila => {

  let item = {
    data: moment(itemFila.dataAcolhimento).format("DD/MM/YYYY HH:mm"),
    peso: itemFila.peso,
    altura: itemFila.altura,
    imc: itemFila.imc,
    temperatura: itemFila.temperatura,
    pressaoArterialSistolica: itemFila.pressaoArterialSistolica,
    pressaoArterialDiastolica: itemFila.pressaoArterialDiastolica,
    pulso: itemFila.pulso,
    frequenciaRespiratoria: itemFila.frequenciaRespiratoria,
    saturacao: itemFila.saturacao
};

  this.listaFila[index].listaSinaisVitais.push(item); 

});

  
});

this.ClassificaoRiscoService.ConsultaClassificacaoRiscoPorPessoaId(pessoaId).subscribe(async (data: Return) => {

  data.result.forEach(itemFila => {
  
    let item = {
      data: moment(itemFila.dataClassificacaoRisco).format("DD/MM/YYYY HH:mm"),
      peso: itemFila.peso,
      altura: itemFila.altura,
      imc: itemFila.imc,
      temperatura: itemFila.temperatura,
      pressaoArterialSistolica: itemFila.pressaoArterialSistolica,
      pressaoArterialDiastolica: itemFila.pressaoArterialDiastolica,
      pulso: itemFila.pulso,
      frequenciaRespiratoria: itemFila.frequenciaRespiratoria,
      saturacao: itemFila.saturacao
  };
  
    this.listaFila[index].listaSinaisVitais.push(item); 
  
  });
  
    
  });

}

onEvasaoSemAtendimento(filaAtendimentoId: any){

  var page = this;

  swal({ title: 'Deseja realizar a saída da fila?', text: '', type: 'warning', showCancelButton: true, cancelButtonText: 'Não', confirmButtonText: 'Sim' })
  .then(function (result) {
    if (result.value) {
   
      page.onRetirarItemFila(filaAtendimentoId);
     

    }
  });


}


onRetirarItemFila(filaAtendimentoId: any) {

  var index = this.listaFila.findIndex(x => x.filaAtendimentoId === filaAtendimentoId);
  this.listaFila.splice(index, 1);

  //buscar o objeto
  var item = this.listaFilaAtendimento.find(x => x.filaAtendimentoId === filaAtendimentoId);
   item.ativo = false;

  //buscar o index
  var index2 = this.listaFilaAtendimento.findIndex(x => x.filaAtendimentoId === filaAtendimentoId);
  this.listaFilaAtendimento.splice(index2, 1);
  this.listaFila = [];
  this.onBindGrid(this.listaFilaAtendimento);

  if(item.classificacaoRisco !== null)
    item.classificacaoRisco.pessoaPaciente = item.acolhimento.pessoaPaciente;

   this.FilaAtendimentoService.RetirarFila(item).subscribe(async (data: Return) => {

    if(data.result !== null){

        this.FilaRegistroService.ConsultarEvento("R").subscribe(async (subdata: Return) => {

          if(subdata.result !== null){

          var date = new Date();
          var filaatendimentoevento: FilaAtendimentoEvento = {
            FilaAtendimento: item,
            dataFilaAtendimentoEvento: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())),
            eventoId: subdata.result.eventoId,
            PessoaProfissional:  this.Profissional
        };


        this.FilaAtendimentoService.AdicionarFilaEvento(filaatendimentoevento).subscribe(async (subdata2: Return) => {
          this.itemRemovido = true;
          this.ConsultaFila();
          Toastr.success("Paciente retirado da fila");
        }, (error: HttpErrorResponse) => {
          this.auth.onSessaoInvalida(error);
    
        });


   }

     }, (error: HttpErrorResponse) => {
       this.auth.onSessaoInvalida(error);
 
     });
    }
   
 }, (error: HttpErrorResponse) => {
   this.auth.onSessaoInvalida(error);

 });

}


}
